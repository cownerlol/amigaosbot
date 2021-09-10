import api from '../common/api';
import { sendGif } from '../common/media';
import { addFilter } from '../lib/antispam';

export default async function hentaiCommand({ messageInfo, from, connection }) {
  const result = await api.loveyou.get('hentai');
  if (result.data) {
    await sendGif(connection, from, messageInfo, result.data.url, { sendEphemeral: true });
  }
  addFilter(from);
}
