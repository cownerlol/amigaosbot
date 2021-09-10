import { MessageType } from '@adiwajshing/baileys';
import fetch from 'node-fetch';
import gis from 'g-i-s';
import { addFilter } from '../lib/antispam';
import { getBuffer } from '../lib/help';

export default async function imageCommand({
  messageInfo, from, connection, args,
}) {
  const gisAsync = async (query) => new Promise((resolve, reject) => {
    gis(query, (error, results) => {
      if (error) {
        reject();
      } else {
        resolve(results);
      }
    });
  });
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
    reply('Faltan parámetros de búsqueda.');
  } else {
    const query = args.join(' ');
    const results = await gisAsync(query);
    const index = Math.floor(Math.random() * results.length);
    const image = results[index];
    const caption = `${image.width}x${image.height}`;
    sendFileFromUrl(image.url, MessageType.image, { quoted: messageInfo, caption });
  }
  addFilter(from);
}
