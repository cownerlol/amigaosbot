import { MessageType } from '@adiwajshing/baileys';
import webshot from 'node-webshot';

export default async function ulStats({
  messageInfo, from, connection, args,
}) {
  const webshot = require('webshot');

  const reply = (message) => {
    connection.sendMessage(from, message, MessageType.text, { quoted: messageInfo });
  };
  if (args.length === 0) {
    reply('Faltan parámetros de búsqueda');
  } else {
    const query = args.join(' ');
    reply(`Obteniendo información de ${query}, por favor espere`);
  }
  const input = `https://gdbrowser.com/u/${query}`;
  const output = 'salida.png';
}
