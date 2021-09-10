import fetch from 'node-fetch';
import axios from 'axios';

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

export async function postBuffer(url, formdata) {
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
}

export async function getJson(url) {
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
}

export async function postJson(url, formdata) {
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
}

export const getRandomExt = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

export const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
