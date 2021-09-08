import { MessageType, WAConnection } from '@adiwajshing/baileys';
import fsAsync from 'fs/promises';

export default class Client {
  /** @type {WAConnection} */
  connection = null

  configPath = './session.json'

  prefix = '!'

  commands = new Map()

  constructor() {
    this.connection = new WAConnection();

    this.connection.logger.level = 'warn';

    this.connection.on('connecting', this.onConnect);
    this.connection.on('open', this.onOpen);
    this.connection.on('qr', this.onScanQR);
    this.connection.on('chat-update', this.onChatUpdate);
  }

  connect = async () => {
    const configExists = await fsAsync.access(this.configPath)
      .then(() => true).catch(() => false);

    if (configExists) {
      this.connection.loadAuthInfo(this.configPath);
    }

    await this.connection.connect({ timeoutMs: 30 * 1000 });
    const sessionData = JSON.stringify(this.connection.base64EncodedAuthInfo(), null, '\t');
    await fsAsync.writeFile(this.configPath, sessionData);
  }

  onConnect = () => {
    console.log('Connecting ...');
  }

  onOpen = () => {
    console.log('Connected');
  }

  onScanQR = () => {
    console.log('QR scanned');
  }

  /**
   * @param {import('@adiwajshing/baileys').WAChatUpdate} update
   */
  onChatUpdate = (update) => {
    try {
      const messageInfo = update.messages?.all().length > 0 ? update.messages?.all()[0] : null;
      const message = messageInfo?.message;

      const processMessage = (update.hasNewMessage && update.messages && message
        && !(messageInfo.key && messageInfo.key.remoteJid === 'status@broadcast'));

      if (!processMessage) { return; }
      console.log('Processing new message...');

      const msgData = this.deconstructMessage(message, messageInfo);
      const { cmd } = msgData;

      if (cmd) {
        this.executeCommand(msgData);
      } else {
        // TODO: Handle non-commands
      }
    } catch (error) {
      console.error(error);
    }
  }

  addCommand = (command, callback) => {
    if (typeof command === 'string') {
      this.commands.set(command, callback);
    } else {
      for (const commandCase of command) {
        this.commands.set(commandCase, callback);
      }
    }
  }

  executeCommand =({
    cmd, args, messageInfo, from,
  }) => {
    const callback = this.commands.get(cmd);

    if (callback) {
      callback({
        cmd, args, connection: this.connection, messageInfo, from,
      });
    } else {
      // TODO: Handle not found command
    }
  }

  /**
   * @param {proto.IMessage} message
   * @param {proto.WebMessageInfo} messageInfo
   */
  deconstructMessage = (message, messageInfo) => {
    const type = Object.keys(message)[0];
    const sentMessage = type === 'ephemeralMessage' ? message.ephemeralMessage.message : message;
    const from = messageInfo.key.remoteJid;
    const quotedMessage = type === MessageType.extendedText && sentMessage.extendedTextMessage.contextInfo
      ? sentMessage.extendedTextMessage.contextInfo.quotedMessage ?? {} : {};
    const quotedType = Object.keys(quotedMessage)[0];

    const messageBody = sentMessage.conversation ?? sentMessage[type].caption ?? sentMessage[type].text ?? '';
    let chats = '';
    if (type === MessageType.text) {
      chats = sentMessage.conversation;
    } else if (type === MessageType.extendedText) {
      chats = sentMessage.extendedTextMessage.text;
    }

    const messageText = this.mapMessageText(sentMessage, type);

    let cmd = null; let
      args = null;

    if (messageText.startsWith(this.prefix)) {
      const textWithoutPrefix = messageText.slice(1).trim();
      const textParts = textWithoutPrefix.split(' ');

      cmd = textParts.shift().toLowerCase();
      args = textParts;
    }

    const messageJson = JSON.stringify(sentMessage);
    const clientId = this.connection.user.jid;
    const clientNumber = clientId.split('@')[0];
    const isGroup = from.endsWith('@g.us');

    let sender = from;
    if (messageInfo.key.fromMe) {
      sender = clientId;
    } else if (isGroup) {
      sender = messageInfo.participant;
    }
    const senderNumber = sender.split('@')[0];

    let contacts = null;
    if (messageInfo.key.fromMe) {
      contacts = clientId;
    } else {
      contacts = this.connection.contacts[sender] ?? { notify: sender.replace(/@.+/, '') };
    }

    let pushname = null;
    if (messageInfo.key.fromMe) {
      pushname = this.connection.user.name;
    } else {
      pushname = contacts.notify ?? contacts.vname ?? contacts.name ?? '-';
    }

    const result = {
      connection: this.connection,
      clientId,
      clientNumber,
      isGroup,
      sender,
      senderNumber,
      contacts,
      pushname,
      messageJson,
      type,
      sentMessage,
      quotedMessage,
      quotedType,
      from,
      messageBody,
      chats,
      messageText,
      cmd,
      args,
    };
    return result;
  }

  /**
   * @param {proto.IMessage} message
   * @param {string} type
   */
  mapMessageText = (message, type) => {
    const mappedMessage = message[type];
    let result = '';

    if (!mappedMessage) {
      result = '';
    } if (mappedMessage.caption && mappedMessage.caption.trim().length > 0) {
      result = mappedMessage.caption;
    } if (mappedMessage.text && mappedMessage.text.trim().length > 0) {
      result = mappedMessage.text;
    } else {
      result = mappedMessage;
    }

    return typeof result === 'string' ? result.trim() : result;
  }
}
