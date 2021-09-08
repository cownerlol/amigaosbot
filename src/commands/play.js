import { MessageType, Mimetype } from '@adiwajshing/baileys';
import fetch from 'node-fetch';
import yts from 'yt-search';
import { addFilter } from '../lib/antispam';
import { getBuffer } from '../lib/help';
import { y2mateA } from '../lib/y2mate';

export default async function playCommand({
  messageInfo, from, connection, args,
}) {
  const reply = (message) => {
    connection.sendMessage(from, message, MessageType.text, { quoted: messageInfo });
  };

  const sendFileFromUrl = async (link, type, options) => {
    const buffer = await getBuffer(link);
    connection.sendMessage(from, buffer, type, options).catch(() => {
      fetch(link).then((hasil) => {
        connection.sendMessage(from, hasil, type, options).catch(() => {
          connection.sendMessage(from, { url: link }, type, options).catch(() => {
            reply('_[ ! ] Error al descargar el archivo_');
          });
        });
      });
    });
  };

  if (args.length === 0) {
    reply('Faltan parámetros de búsqueda');
  } else {
    const query = args.join(' ');
    reply(`Espere un momento, ${query} se está descargando.`);
    if (!query.endsWith('-doc')) {
      const queryResult = await yts(query);
      const firstVideo = queryResult.all[0];
      const thumbInfo = ` [ *${firstVideo.title}* ]
Subido hace: ${firstVideo.ago}
Vistas : ${firstVideo.views}
Duración : ${firstVideo.timestamp}
Canal : ${firstVideo.author.name}
Link del Canal : ${firstVideo.author.url}
El archivo se está enviando.`;
      sendFileFromUrl(firstVideo.image, MessageType.image, { quoted: messageInfo, caption: thumbInfo });
      const downloadResult = await y2mateA(firstVideo.url);
      const video = downloadResult[0];
      const { link, output: file } = video;
      sendFileFromUrl(link, MessageType.audio, {
        quoted: messageInfo, mimetype: Mimetype.mp4Audio, filename: file,
      });
    }
  }
  addFilter(from);
}
