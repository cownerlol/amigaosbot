import { MessageType } from '@adiwajshing/baileys';
import fsAsync from 'fs/promises';
import captureWebsite from 'capture-website';
import { randomString } from '../common/files';
import { addFilter } from '../lib/antispam';

/**
 * @typedef {Object} Command
 * @property {import('@adiwajshing/baileys').WAConnection} connection
 */

/** @param {Command} args */
export default async function ulStatsCommand({
  messageInfo, from, connection, args,
}) {
  const reply = (message) => {
    connection.sendMessage(from, message, MessageType.text, { quoted: messageInfo });
  };

  if (args.length === 0) {
    reply('Faltan parámetros de búsqueda.');
  } else {
    const username = args[0];
    const filepath = `tmp/${randomString()}.png`;
    const url = `https://gdbrowser.com/u/${username}`;
    const options = {
      width: 1920,
      height: 1080,
    };
    await captureWebsite.file(url, filepath, options);

    const image = await fsAsync.readFile(filepath);
    await connection.sendMessage(from, image, MessageType.image, { quoted: messageInfo, caption: username });
    await fsAsync.unlink(filepath);
  }
  addFilter(from);
}
