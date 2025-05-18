import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const key = Buffer.from(process.env.ENCRYPTION_KEY ?? '', 'utf8');
const iv = Buffer.from(process.env.ENCRYPTION_IV ?? '', 'utf8');

if (key.length !== 32 || iv.length !== 16) {
  throw new Error('Encryption key must be 32 bytes and IV must be 16 bytes');
}

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

export function decrypt(enc: string): string {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(enc, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
