import fs from 'fs';
import { MessageType, Mimetype } from '@adiwajshing/baileys';

export default async function woretiMedia({
  messageInfo, from, connection,
}) {
  connection.sendMessage(from, fs.readFileSync('./media/woreti.mp4'), MessageType.video, { quoted: messageInfo, mimetype: Mimetype.mp4Video, caption: 'pone sala bro' });
}
