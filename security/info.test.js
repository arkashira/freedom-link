const EncryptionInfo = require('./info');

describe('EncryptionInfo', () => {
  it('should return encryption standards', () => {
    const encryptionInfo = new EncryptionInfo();
    const encryptionStandards = encryptionInfo.getEncryptionStandards();
    expect(encryptionStandards).toBeInstanceOf(Array);
    expect(encryptionStandards.length).toBeGreaterThan(0);
  });

  it('should return user info', () => {
    const encryptionInfo = new EncryptionInfo();
    const userInfo = encryptionInfo.getUserInfo();
    expect(userInfo).toBe('No user data is stored on the server.');
  });
});