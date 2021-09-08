const { WAConnection, MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const googleit = require('google-it');
const fs = require('fs');
const { takeCoverage, getHeapSnapshot } = require('v8');
const { get, ClientRequest } = require('http');
const { Cipher } = require('crypto');
const { sendGif } = require('./common/media');

let chats;
let budy;
let cmd;
let comm;
let mess;
let typeMessage;
let waifu;
let hasil;

const prefix = '!';
const apikey = 'LindowApi';

async function iniciar() {
  const client = new WAConnection();
  client.logger.level = 'warn';

  client.on('qr', () => {
  });
  fs.existsSync('./session.json') && client.loadAuthInfo('./session.json');
  client.on('connecting', () => {
    console.log('Conectando');
  });

  client.on('open', () => {
    console.log('Conectado exitosamente :D');
  });
  await client.connect({ timeoutMs: 30 * 1000 });
  fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'));

  client.on('chat-update', async (koner) => {
    try {
      if (!koner.hasNewMessage) return;
      if (!koner.messages) return;
      if (koner.key && koner.key.remoteJid == 'status@broadcast') return;

      koner = koner.messages.all()[0];
      if (!koner.message) return;
      global.blocked;
      koner.message = (Object.keys(koner.message)[0] === 'ephemeralMessage') ? koner.message.ephemeralMessage.message : koner.message;
      const from = koner.key.remoteJid;
      const type = Object.keys(koner.message)[0];
      const quoted = type == 'extendedTextMessage' && koner.message.extendedTextMessage.contextInfo != null ? koner.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const typeQuoted = Object.keys(quoted)[0];
      const content = JSON.stringify(koner.message);
      const {
        text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product,
      } = MessageType;
      const body = koner.message.conversation || koner.message[type].caption || koner.message[type].text || '';
      chats = (type === 'conversation') ? koner.message.conversation : (type === 'extendedTextMessage') ? koner.message.extendedTextMessage.text : '';
      budy = (type === 'conversation' && koner.message.conversation.startsWith(prefix)) ? koner.message.conversation : (type == 'imageMessage') && koner.message.imageMessage.caption.startsWith(prefix) ? koner.message.imageMessage.caption : (type == 'videoMessage') && koner.message.videoMessage.caption.startsWith(prefix) ? koner.message.videoMessage.caption : (type == 'extendedTextMessage') && koner.message.extendedTextMessage.text.startsWith(prefix) ? koner.message.extendedTextMessage.text : '';

      if (prefix != '') {
        if (!body.startsWith(prefix)) {
          cmd = false;
          comm = '';
        } else {
          cmd = true;
          comm = body.slice(1).trim().split(' ').shift()
            .toLowerCase();
        }
      } else {
        cmd = false;
        comm = body.trim().split(' ').shift().toLowerCase();
      }

      const command = comm;
      const arg = chats.slice(command.length + 2, chats.length);
      const args = budy.trim().split(/ +/).slice(1);
      const isCmd = budy.startsWith(prefix);
      const q = args.join(' ');
      const soyYo = client.user.jid;
      const isGroup = from.endsWith('@g.us');
      const botNumber = client.user.jid.split('@')[0];
      const ownerNumber = ['56973416582@s.whatsapp.net'];
      const help = require('./lib/help');
      const { getBuffer } = help;
      const sender = koner.key.fromMe ? client.user.jid : isGroup ? koner.participant : koner.key.remoteJid;
      const senderNumber = sender.split('@')[0];
      const jid = sender;
      const conts = koner.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') };
      const pushname = koner.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-';
      const { getJson } = help;
      const sendFileFromUrl = async (link, type, options) => {
        hasil = await getBuffer(link);
        client.sendMessage(from, hasil, type, options).catch((e) => {
          fetch(link).then((hasil) => {
            client.sendMessage(from, hasil, type, options).catch((e) => {
              client.sendMessage(from, { url: link }, type, options).catch((e) => {
                reply('_[ ! ] Error al descargar el archivo_');
                console.log(e);
              });
            });
          });
        });
      };

      mess = {

        only: {
          group: '「 ❗ 」Este comando solo puede ser usado en grupos!',
          admin: '「 ❗ 」Este comando solo puede ser usado por un administrador!',
        },
      };
      // ñ
      const getRandom = help.getRandomExt;
      const isImage = type == 'imageMessage';
      const isVideo = type == 'videoMessage';
      const isAudio = type == 'audioMessage';
      const isSticker = type == 'stickerMessage';
      const isContact = type == 'contactMessage';
      const isLocation = type == 'locationMessage';
      const isMedia = (type === 'imageMessage' || type === 'videoMessage');
      const isText = type == 'textMessage';
      const reply = (teks) => {
        client.sendMessage(from, teks, text, { quoted: koner });
      };
      typeMessage = body.substr(0, 50).replace(/\n/g, '');
      if (isImage) typeMessage = 'Image';
      else if (isVideo) typeMessage = 'Video';
      else if (isAudio) typeMessage = 'Audio';
      else if (isSticker) typeMessage = 'Sticker';
      else if (isContact) typeMessage = 'Contact';
      else if (isLocation) typeMessage = 'Location';
      else if (isText) typeMessage = 'text';

      const isQuoted = type == 'extendedTextMessage';
      const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage');
      const isQuotedImage = isQuoted && typeQuoted == 'imageMessage';
      const isQuotedVideo = isQuoted && typeQuoted == 'videoMessage';
      const isQuotedAudio = isQuoted && typeQuoted == 'audioMessage';
      const isQuotedSticker = isQuoted && typeQuoted == 'stickerMessage';
      const isQuotedContact = isQuoted && typeQuoted == 'contactMessage';
      const isQuotedLocation = isQuoted && typeQuoted == 'locationMessage';

      const { convertSticker } = require('./lib/swm.js');
      const { isFiltered, addFilter } = require('./lib/antispam');
      const {
        h2k, generateMessageID, getGroupAdmins, banner, start, info, success, close,
      } = require('./lib/functions.js');
      const groupMetadata = isGroup ? await client.groupMetadata(from) : '';
      const groupMembers = isGroup ? groupMetadata.participants : '';
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
      const isGroupAdmins = groupAdmins.includes(sender) || false;
      const { spawn, exec, execSync } = require('child_process');
      const {
        fetchJson, getBase64, kyun, createExif,
      } = require('./lib/fetcher');
      const googleImg = require('g-i-s');
      const yts = require('yt-search');
      const { y2mateA, y2mateV } = require('./lib/y2mate.js');
      let result = null;
      switch (command) {
        // Media
        case 'sticker':
        case 's':
        case 'stiker':
        case 'stickee':
          if ((isMedia && !koner.message.videoMessage || isQuotedImage) && args.length == 0) {
            F = body.slice(6);
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(koner).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : koner;
            const media = await client.downloadAndSaveMediaMessage(encmedia);
            ran = '666.webp';
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
                client.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, { quoted: koner });
                fs.unlinkSync(media);
                fs.unlinkSync(ran);
              })
              .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'])
              .toFormat('webp')
              .save(ran);
          } else if ((isMedia && koner.message.videoMessage.seconds < 11 || isQuotedVideo && koner.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(koner).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : koner;
            const media = await client.downloadAndSaveMediaMessage(encmedia);
            ran = '999.webp';
            await ffmpeg(`./${media}`)
              .inputFormat(media.split('.')[1])
              .on('start', (cmd) => {
                console.log(`Started : ${cmd}`);
              })
              .on('error', (err) => {
                console.log(`Error : ${err}`);
                fs.unlinkSync(media);
                tipe = media.endsWith('.mp4') ? 'video' : 'gif';
                reply('no se pudo convertir el pepee');
              })
              .on('end', () => {
                console.log('Finish');
                client.sendMessage(from, fs.readFileSync(ran), MessageType.sticker, { quoted: koner });
                fs.unlinkSync(media);
                fs.unlinkSync(ran);
              })
              .addOutputOptions(['-vcodec', 'libwebp', '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'])
              .toFormat('webp')
              .save(ran);
          } else {
          }
          break;
        case 'attp':
          if (args.length < 1) return reply('y el texto?2');
          var teks = encodeURIComponent(args.join(' '));
          const attp1 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${teks}`);
          client.sendMessage(from, attp1, sticker, { quoted: koner, contextInfo: { forwardingScore: 999, isForwarded: true } });
          break;
        // NSFW
        case 'trap':
          waifu = await getJson('https://nekos.life/api/v2/img/trap');
          sendFileFromUrl(waifu.url, image, { quoted: koner, sendEphemeral: true });
          addFilter(from);
          break;
        case 'neko':
          waifu = await getJson('https://nekos.life/api/v2/img/lewd');
          sendFileFromUrl(waifu.url, image, { quoted: koner, sendEphemeral: true });
          addFilter(from);
          break;
        case 'hentai':
          result = await getJson('https://nekos.life/api/v2/img/Random_hentai_gif');
          await sendGif(client, from, koner, result.url, { sendEphemeral: true });
          addFilter(from);
          break;
        case 'h':
          result = await getJson('https://nekos.life/api/v2/img/hug');
          await sendGif(client, from, koner, result.url);
          addFilter(from);
          break;
        // Busqueda
        case 'google':
          const buscar = args.join(' ');
          if (!buscar) return reply('Qué deseas buscar?');
          const search = await googleit({ query: buscar });
          let ggsm = '';
          for (const i of search) {
            ggsm += `
                *Titulo :* ${i.title}
                k :* ${i.link}
                *Contenido :* ${i.snippet}
                `;
          }
          var googlegg = ggsm.trim();
          reply(`${googlegg}`);
          addFilter(from);
          break;
        case 'imagenes':
          if (args.length < 1) return reply('Qué deseas buscar?');
          reply(`Por favor, espera un mientras busco imagenes de ${args.join(' ')}`);
          ggimg = args.join(' ');
          res = await googleImg(ggimg, google);
          function google(error, result) {
            if (error) { return reply('Intentalo de nuevo!'); }

            const gugIm = result;
            const random = gugIm[Math.floor(Math.random() * gugIm.length)].url;
            sendFileFromUrl(random, image, { quoted: koner });
          }
          addFilter(from);
          break;
        case 'play':
          reply(`Espere un momento, ${q} se está descargando.`);
          teks = args.join(' ');
          if (!teks.endsWith('-doc')) {
            res1 = await yts(q).catch((e) => {
              reply('[ ! ] No se pudo encontrar lo que buscaba.');
            });
            const thumbInfo = ` [ *${res1.all[0].title}* ]
        Subido hace: ${res1.all[0].ago}
        Vistas : ${res1.all[0].views}
        Duración : ${res1.all[0].timestamp}
        Canal : ${res1.all[0].author.name}
        Link del Canal : ${res1.all[0].author.url}
        El archivo se está enviando.
                                `;
            sendFileFromUrl(res1.all[0].image, image, { quoted: koner, caption: thumbInfo });
            res1 = await y2mateA(res1.all[0].url).catch((e) => {
              pr21 = getJson(`https://api.zeks.xyz/api/ytmp3?apikey=hamilton20&url=${res1.all[0].url}`);
              reply('[ ! ] Lo siento, su descarga no pudo ser completada.\n\n*Realizando busqueda en el servidor 2');
              sendFileFromUrl(pr21.result.url_audio, audio, { quoted: koner, mimetype: 'audio/mp4', filename: res1[0].output });
              sendFileFromUrl(pr21.result.url_audio, audio, {
                quoted: koner, mimetype: 'audio/mp4', ptt: true, filename: res1[0].output,
              });
            });
            sendFileFromUrl(res1[0].link, audio, { quoted: koner, mimetype: 'audio/mp4', filename: res1[0].output });
            sendFileFromUrl(res1[0].link, audio, {
              quoted: koner, mimetype: 'audio/mp4', ptt: true, filename: res1[0].output,
            });
          }
          addFilter(from);
          break;
        default:
      }
    } catch (e) {
      console.log(e);
    }
  });
}
iniciar()
  .catch((err) => console.log(`unexpected error: ${err}`));
