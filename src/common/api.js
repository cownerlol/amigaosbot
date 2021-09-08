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
};
