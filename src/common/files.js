import crypto from 'crypto';

export function randomString(bytes = 24) {
  return crypto.randomBytes(bytes).toString('hex');
}
