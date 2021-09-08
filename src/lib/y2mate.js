const fetch = require('node-fetch');

const cheerio = require('cheerio');

const y2mateV = async (yutub) => {
  function post(url, formdata) {
    return fetch(url, {

      method: 'POST',

      headers: {

        accept: '*/*',

        'accept-language': 'en-US,en;q=0.9',

        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',

      },

      body: new URLSearchParams(Object.entries(formdata)),

    });
  }

  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;

  const ytId = ytIdRegex.exec(yutub);

  url = `https://youtu.be/${ytId[1]}`;

  const res = await post('https://www.y2mate.com/mates/en68/analyze/ajax', {

    url,

    q_auto: 0,

    ajax: 1,

  });

  const mela = await res.json();

  const $ = cheerio.load(mela.result);

  const hasil = [];

  const thumb = $('div').find('.thumbnail.cover > a > img').attr('src');

  const judul = $('div').find('.thumbnail.cover > div > b').text();

  const quality = $('div').find('#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(3) > a').attr('data-fquality');

  const tipe = $('div').find('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(3) > a').attr('data-ftype');

  const output = `${judul}.${tipe}`;

  const size = $('div').find('#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();

  const id = /var k__id = "(.*?)"/.exec(mela.result)[1];

  const res2 = await post('https://www.y2mate.com/mates/en68/convert', {

    type: 'youtube',

    _id: id,

    v_id: ytId[1],

    ajax: '1',

    token: '',

    ftype: tipe,

    fquality: quality,

  });

  const meme = await res2.json();

  const supp = cheerio.load(meme.result);

  const link = supp('div').find('a').attr('href');

  hasil.push({
    thumb, judul, quality, tipe, size, output, link,
  });

  return hasil;
};

const y2mateA = async (yutub) => {
  function post(url, formdata) {
    return fetch(url, {

      method: 'POST',

      headers: {

        accept: '*/*',

        'accept-language': 'en-US,en;q=0.9',

        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',

      },

      body: new URLSearchParams(Object.entries(formdata)),

    });
  }

  const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;

  const ytId = ytIdRegex.exec(yutub);

  const url = `https://youtu.be/${ytId[1]}`;

  const res = await post('https://www.y2mate.com/mates/en68/analyze/ajax', {

    url,

    q_auto: 0,

    ajax: 1,

  });

  const mela = await res.json();

  const $ = cheerio.load(mela.result);

  const hasil = [];

  const thumb = $('div').find('.thumbnail.cover > a > img').attr('src');

  const judul = $('div').find('.thumbnail.cover > div > b').text();

  const size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text();

  const tipe = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype');

  const output = `${judul}.${tipe}`;

  const quality = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality');

  const id = /var k__id = "(.*?)"/.exec(mela.result)[1];

  const res2 = await post('https://www.y2mate.com/mates/en68/convert', {

    type: 'youtube',

    _id: id,

    v_id: ytId[1],

    ajax: '1',

    token: '',

    ftype: tipe,

    fquality: quality,

  });

  const meme = await res2.json();

  const supp = cheerio.load(meme.result);

  const link = supp('div').find('a').attr('href');

  hasil.push({
    thumb, judul, quality, tipe, size, output, link,
  });

  return hasil;
};

module.exports = { y2mateV, y2mateA };
