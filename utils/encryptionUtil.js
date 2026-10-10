
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';

function getEncryptionKey() {
  const key = process.env.DATA_ENCRYPTION_KEY;

  if (!key || !/^[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error(
      'DATA_ENCRYPTION_KEY must be set to a 64-character hex key.'
    );
  }

  return Buffer.from(key, 'hex');
}

function encryptData(plainText) {
  if (typeof plainText !== 'string') {
    throw new TypeError('Data to encrypt must be a string.');
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    getEncryptionKey(),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString('hex'),
    authTag.toString('hex'),
    encrypted.toString('hex')
  ].join(':');
}

function decryptData(encryptedText) {
  const parts = encryptedText.split(':');

  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format.');
  }

  const [ivHex, authTagHex, encryptedHex] = parts;

  if (
    !/^[0-9a-f]{24}$/i.test(ivHex) ||
    !/^[0-9a-f]{32}$/i.test(authTagHex) ||
    !/^(?:[0-9a-f]{2})*$/i.test(encryptedHex)
  ) {
    throw new Error('Invalid encrypted data components.');
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(ivHex, 'hex')
  );

  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, 'hex')),
    decipher.final()
  ]);

  return decrypted.toString('utf8');
}

module.exports = { encryptData, decryptData };