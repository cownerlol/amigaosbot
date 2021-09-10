import fs from 'fs';
import { MessageType, Mimetype } from '@adiwajshing/baileys';

export default async function fabriMedia({
  messageInfo, from, connection,
}) {
  connection.sendMessage(from, fs.readFileSync('./media/fabri.mp4'), MessageType.video, { quoted: messageInfo, mimetype: Mimetype.mp4Video, caption: 'e e e e e e eee ee ee 💪' });
}
