const fetch = require('node-fetch');
const axios = require('axios');

export async function getBuffer(url, options) {
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
}

exports.postBuffer = async (url, formdata) => {
  try {
    options = {
      method: 'POST',
      body: formdata,
    };
    const res = await fetch(url, options);
    return res.buffer();
  } catch (e) {
    throw e;
  }
};

exports.getJson = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'okhttp/4.5.0',
      },
      method: 'GET',
    });
    return res.json();
  } catch (e) {
    throw e;
  }
};

exports.postJson = async (url, formdata) => {
  try {
    options = {
      method: 'POST',
      body: formdata,
    };
    const res = await fetch(url, options);
    return res.json();
  } catch (e) {
    throw e;
  }
};

exports.getRandomExt = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

exports.sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
