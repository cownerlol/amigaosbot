const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');
const cfonts = require('cfonts');
const spin = require('spinnies');
const Crypto = require('crypto');

const corzinhas = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'];
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];

const h2k = (number) => {
  const SI_POSTFIXES = ['', ' K', ' M', ' G', ' T', ' P', ' E'];
  const tier = Math.log10(Math.abs(number)) / 3 | 0;
  if (tier == 0) return number;
  const postfix = SI_POSTFIXES[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  let formatted = `${scaled.toFixed(1)}`;
  if (/\.0$/.test(formatted)) { formatted = formatted.substr(0, formatted.length - 2); }
  return formatted + postfix;
};

const getBuffer = async (url, options) => {
  try {
    options || {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        DNT: 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

const randomBytes = (length) => Crypto.randomBytes(length);

const generateMessageID = () => randomBytes(10).toString('hex').toUpperCase();

const getGroupAdmins = (participants) => {
let admins = [];
  for (const i of participants) {
    i.isAdmin ? admins.push(i.jid) : '';
  }
  return admins;
};

/*

*/
const spinner = {
  interval: 150,
  frames: [
    'I',
    'It',
    'Ita',
    'Ital',
    'Italu',
  ],
};

let globalSpinner;

const getGlobalSpinner = () => {
  if (!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner });
  return globalSpinner;
};

const spins = getGlobalSpinner(false);

const start = (id, text) => {
  spins.add(id, { text });
};
const info = (id, text) => {
  spins.update(id, { text });
};
const success = (id, text) => {
  spins.succeed(id, { text });
};

const close = (id, text) => {
  spins.fail(id, { text });
};

const banner = cfonts.render(('FX|BOT|V72'), {
  font: 'block',
  align: 'center',
  colors: [`${cor1}`, `${cor2}`],
  lineHeight: 1,
});

const addATM = (sender) => {
        	const obj = { id: sender, uang: 0 };
  uang.push(obj);
  fs.writeFileSync('./datauser/uang.json', JSON.stringify(uang));
};

const addKoinUser = (sender, amount) => {
  let position = false;
  Object.keys(uang).forEach((i) => {
    if (uang[i].id === sender) {
      position = i;
    }
  });
  if (position !== false) {
    uang[position].uang += amount;
    fs.writeFileSync('./datauser/uang.json', JSON.stringify(uang));
  }
};

const checkATMuser = (sender) => {
        	let position = false;
  Object.keys(uang).forEach((i) => {
    if (uang[i].id === sender) {
      position = i;
    }
  });
  if (position !== false) {
    return uang[position].uang;
  }
};

function temporizador(segundos) {
  function tempo(s) {
    return (s < 10 ? '0' : '') + s;
  }
  const horas = Math.floor(segundos / (60 * 60));
  const minutos = Math.floor(segundos % (60 * 60) / 60);
  var segundos = Math.floor(segundos % 60);
  return `${tempo(horas)}:${tempo(minutos)}:${tempo(segundos)}`;
}

module.exports = {
  getBuffer,
  h2k,
  generateMessageID,
  getGroupAdmins,
  start,
  info,
  success,
  banner,
  close,
  addATM,
  addKoinUser,
  checkATMuser,
  temporizador,
};
