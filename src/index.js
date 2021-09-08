import Client from './Client';
import hentaiCommand from './commands/hentai';
import hugCommand from './commands/hug';
import playCommand from './commands/play';

const client = new Client();
client.addCommand(['hentai'], hentaiCommand);
client.addCommand(['h', 'hug'], hugCommand);
client.addCommand(['play'], playCommand);
client.connect();
