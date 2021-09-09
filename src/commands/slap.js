// https://nekos.life/api/v2/img/slap
import api from '../common/api';
import { sendGif } from '../common/media';
import { addFilter } from '../lib/antispam';

/**
 * @typedef {Object} Command
 * @property {import('@adiwajshing/baileys').proto.IMessage} sentMessage
 * @property {import('@adiwajshing/baileys').WAConnection} connection
 */

/** @param {Command} args */
export default async function slapCommand({
  messageInfo, from, connection, sentMessage, sender,
}) {
  const mentionedIds = [sender, ...sentMessage.extendedTextMessage.contextInfo.mentionedJid];
  const mentionedNumbers = mentionedIds.map((id) => id.split('@')[0]);

  const caption = `@${mentionedNumbers[0]} abofetea a @${mentionedNumbers[1]}`;

  const result = await api.nekoslife.get('slap');
  const options = { sendEphemeral: true, contextInfo: { mentionedJid: mentionedIds }, caption };
  if (result.data) {
    await sendGif(connection, from, messageInfo, result.data.url, options);
  }

  addFilter(from);
}
