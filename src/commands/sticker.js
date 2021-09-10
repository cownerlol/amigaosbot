import { MessageType } from '@adiwajshing/baileys';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

export default async function stickerCommand({
  messageInfo, from, connection, args, type, typeQuoted,
}) {
  const reply = (message) => {
    connection.sendMessage(from, message, MessageType.text, { quoted: messageInfo });
  };
  const isQuoted = type === 'extendedTextMessage';
  const isQuotedImage = isQuoted && typeQuoted === 'imageMessage';
  const isMedia = (type === 'imageMessage' || type === 'videoMessage');
  const isQuotedVideo = isQuoted && typeQuoted === 'videoMessage';
  if (((isMedia && !messageInfo.message.videoMessage) || isQuotedImage) && args.length === 0) {
    const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(messageInfo).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : messageInfo;
    const media = await connection.downloadAndSaveMediaMessage(encmedia);
    const ran = '666.webp';
    await ffmpeg(`./${media}`)
      .input(media)
      .on('start', (cmd) => {
        console.log(`Started : ${cmd}`);
      })
      .on('error', (err) => {
        console.log(`Error : ${err}`);
        fs.unlinkSync(media);
        reply('error');
      })
      .on('end', () => {
        console.log('Finish');
        connection.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, { quoted: messageInfo });
        fs.unlinkSync(media);
        fs.unlinkSync(ran);
      })
      .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'])
      .toFormat('webp')
      .save(ran);
  } else if (((isMedia && messageInfo.message.videoMessage.seconds < 11) || (isQuotedVideo && messageInfo.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) && args.length === 0) {
    const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(messageInfo).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : messageInfo;
    const media = await connection.downloadAndSaveMediaMessage(encmedia);
    const ran = '999.webp';
    await ffmpeg(`./${media}`)
      .inputFormat(media.split('.')[1])
      .on('start', (cmd) => {
        console.log(`Started : ${cmd}`);
      })
      .on('error', (err) => {
        console.log(`Error : ${err}`);
        fs.unlinkSync(media);
        reply('no se pudo convertir el pepee');
      })
      .on('end', () => {
        console.log('Finish');
        connection.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, { quoted: messageInfo });
        fs.unlinkSync(media);
        fs.unlinkSync(ran);
      })
      .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'])
      .toFormat('webp')
      .save(ran);
  }
}
