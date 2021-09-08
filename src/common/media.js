import { MessageType, Mimetype } from '@adiwajshing/baileys';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { getBuffer } from '../lib/help';
import { randomString } from './files';

export async function gifToMp4(gifBuffer) {
  const inputName = `${randomString()}.gif`;
  const outputName = `${randomString()}.mp4`;

  return new Promise((resolve) => {
    fs.writeFile(`tmp/${inputName}`, gifBuffer, () => {
      ffmpeg(`tmp/${inputName}`).outputOptions([
        '-movflags faststart',
        '-pix_fmt yuv420p',
        '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2',
      ])
        .inputFormat('gif')
        .on('end', () => {
          fs.readFile(`tmp/${outputName}`, (err, mp4Buffer) => {
            resolve(mp4Buffer);
            fs.unlink(`tmp/${inputName}`, () => {});
            fs.unlink(`tmp/${outputName}`, () => {});
          });
        })
        .save(`tmp/${outputName}`);
    });
  });
}

export async function sendGifFromUrl(client, from, quote, link, type, options) {
  const gifBuffer = await getBuffer(link);
  const mp4Buffer = await gifToMp4(gifBuffer);

  const result = await client.sendMessage(from, mp4Buffer, type, options);

  if (result == null) {
    const error = '_[ ! ] Error al descargar el archivo_';
    client.sendMessage(from, error, MessageType.text, { quoted: quote });
  }
}

export async function sendGif(client, from, quote, url, additionalOptions = null) {
  const options = { quoted: quote, mimetype: Mimetype.gif, ...additionalOptions };
  await sendGifFromUrl(client, from, quote, url, MessageType.video, options);
}
