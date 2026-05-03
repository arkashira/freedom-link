const crypto = require('crypto');
const tls = require('tls');

class Encryption {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.key = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
  }

  encrypt(data) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return encrypted;
  }

  decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted;
  }

  getEncryptionStandards() {
    return `Using ${this.algorithm} encryption algorithm`;
  }
}

module.exports = Encryption;