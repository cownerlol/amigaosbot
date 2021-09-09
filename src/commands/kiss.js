import api from '../common/api';
import { sendGif } from '../common/media';
import { addFilter } from '../lib/antispam';

/**
 * @typedef {Object} Command
 * @property {import('@adiwajshing/baileys').proto.IMessage} sentMessage
 * @property {import('@adiwajshing/baileys').WAConnection} connection
 */

/** @param {Command} args */
export default async function kissCommand({
  messageInfo, from, connection, sentMessage, sender,
}) {
  const mentionedIds = [sender, ...sentMessage.extendedTextMessage.contextInfo.mentionedJid];
  const mentionedNumbers = mentionedIds.map((id) => id.split('@')[0]);

  const caption = `@${mentionedNumbers[1]} ha recibido un beso con mucho amor de @${mentionedNumbers[0]} 💞`;

  const result = await api.nekoslife.get('kiss');
  const options = { sendEphemeral: true, contextInfo: { mentionedJid: mentionedIds }, caption };
  if (result.data) {
    await sendGif(connection, from, messageInfo, result.data.url, options);
  }

  addFilter(from);
}
