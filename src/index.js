import Client from './Client';
import hentaiCommand from './commands/hentai';

const client = new Client();
client.addCommand(['h', 'hentai'], hentaiCommand);
client.connect();
