import axios from 'axios';

/** @type {import("axios").AxiosRequestConfig} */
const defaultConfig = {
  headers: {
    'User-Agent': 'okhttp/4.5.0',
  },
};

export default {
  common: axios.create({ ...defaultConfig }),
  nekoslife: axios.create({ baseURL: 'https://nekos.life/api/v2/img', ...defaultConfig }),
  nekolove: axios.create({ baseURL: 'https://neko-love.xyz/api/v1', ...defaultConfig }),
  loveyou: axios.create({ baseURL: 'https://love-you.xyz/api/v2', ...defaultConfig }),
  waifupics: axios.create({ baseURL: 'https://api.waifu.pics/nsfw/', ...defaultConfig }),
  userul: axios.create({ baseURL: 'https://gdbrowser.com/u/', ...defaultConfig }),
};
