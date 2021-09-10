import Client from './Client';
import hentaiCommand from './commands/hentai';
import hugCommand from './commands/hug';
import playCommand from './commands/play';
import kissCommand from './commands/kiss';
import slapCommand from './commands/slap';
import cumCommand from './commands/cum';
import fuckCommand from './commands/fuck';
import analCommand from './commands/anal';
import bakaCommand from './commands/baka';
import patCommand from './commands/pat';
import nekoCommand from './commands/neko';
import punchCommand from './commands/punch';
import cryCommand from './commands/cry';
import blowjobCommand from './commands/blowjob';
import stickerCommand from './commands/sticker';
import imageCommand from './commands/image';
import fabriMedia from './commands/fabri';
import woretiMedia from './commands/woreti';
import attpCommand from './commands/attp';
import menuList from './commands/menu';
import ulStats from './commands/ulStats';

const client = new Client();
// Roleplay
client.addCommand(['hentai'], hentaiCommand);
client.addCommand(['h', 'hug'], hugCommand);
client.addCommand(['kiss'], kissCommand);
client.addCommand(['slap'], slapCommand);
client.addCommand(['cum'], cumCommand);
client.addCommand(['fuck'], fuckCommand);
client.addCommand(['anal'], analCommand);
client.addCommand(['baka'], bakaCommand);
client.addCommand(['pat'], patCommand);
client.addCommand(['neko'], nekoCommand);
client.addCommand(['punch'], punchCommand);
client.addCommand(['cry'], cryCommand);
client.addCommand(['blowjob', 'bj'], blowjobCommand);
// Media
client.addCommand(['sticker'], stickerCommand);
client.addCommand(['image'], imageCommand);
client.addCommand(['play'], playCommand);
client.addCommand(['attp'], attpCommand);

// Saved videos/audios
client.addCommand(['fabri'], fabriMedia);
client.addCommand(['woreti'], woretiMedia);

// Lists/Menus
client.addCommand(['menu', 'list', 'help'], menuList);

// NSFW

// User/server stats
client.addCommand(['ul', 'gduser'], ulStats);
client.connect();
