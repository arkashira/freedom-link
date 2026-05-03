const assert = require('assert');
const Encryption = require('../security/encryption');

describe('Encryption', () => {
  it('should encrypt and decrypt data', () => {
    const encryption = new Encryption();
    const data = 'Hello, World!';
    const encrypted = encryption.encrypt(data);
    const decrypted = encryption.decrypt(encrypted);
    assert.strictEqual(decrypted.toString(), data);
  });

  it('should return encryption standards', () => {
    const encryption = new Encryption();
    const standards = encryption.getEncryptionStandards();
    assert.ok(standards.includes('aes-256-cbc'));
  });
});