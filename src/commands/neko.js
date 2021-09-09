import api from '../common/api';
import { sendGif } from '../common/media';
import { addFilter } from '../lib/antispam';

export default async function nekoCommand({ messageInfo, from, connection }) {
  const result = await api.nekoslife.get('nsfw_neko_gif');
  if (result.data) {
    await sendGif(connection, from, messageInfo, result.data.url, { caption: 'Nyaaa o///o', sendEphemeral: true });
  }
  addFilter(from);
}
