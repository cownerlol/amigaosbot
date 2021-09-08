import api from '../common/api';
import { sendGif } from '../common/media';
import { addFilter } from '../lib/antispam';

/**
 * @typedef {Object} Command
 * @property {import('@adiwajshing/baileys').proto.IMessage} sentMessage
 * @property {import('@adiwajshing/baileys').WAConnection} connection
 */

/** @param {Command} args */
export default async function hugCommand({
  messageInfo, from, connection, sentMessage, sender,
}) {
  const mentionedIds = [sender, ...sentMessage.extendedTextMessage.contextInfo.mentionedJid];
  const mentionedNumbers = mentionedIds.map((id) => id.split('@')[0]);

  const caption = `@${mentionedNumbers[0]} abraza a @${mentionedNumbers[1]}, que lindo!`;

  const result = await api.nekoslife.get('hug');
  const options = { sendEphemeral: true, contextInfo: { mentionedJid: mentionedIds }, caption };
  if (result.data) {
    await sendGif(connection, from, messageInfo, result.data.url, options);
  }

  addFilter(from);
}
