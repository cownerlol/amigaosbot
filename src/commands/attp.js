import { MessageType } from '@adiwajshing/baileys';
import { getBuffer } from '../lib/help';

export default async function attpCommand({
  messageInfo, from, connection, args,
}) {
  const reply = (message) => {
    connection.sendMessage(from, message, MessageType.text, { quoted: messageInfo });
  };

  if (args.length < 1) return reply('y el texto?');
  const teks = encodeURIComponent(args.join(' '));
  const attp1 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${teks}`);
  connection.sendMessage(from, attp1, MessageType.sticker, { quoted: messageInfo });
}
