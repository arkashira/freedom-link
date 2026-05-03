class EncryptionInfo {
  constructor() {
    this.encryptionStandards = [
      {
        name: 'AES-256-GCM',
        description: 'A widely used and highly secure encryption standard.'
      },
      {
        name: 'ChaCha20-Poly1305',
        description: 'A fast and secure encryption standard.'
      }
    ];
  }

  getEncryptionStandards() {
    return this.encryptionStandards;
  }

  getUserInfo() {
    return 'No user data is stored on the server.';
  }
}

const encryptionInfo = new EncryptionInfo();

function displayEncryptionInfo() {
  const encryptionStandards = encryptionInfo.getEncryptionStandards();
  const userInfo = encryptionInfo.getUserInfo();

  console.log('Encryption Standards:');
  encryptionStandards.forEach((standard) => {
    console.log(`- ${standard.name}: ${standard.description}`);
  });
  console.log(`\n${userInfo}`);
}

displayEncryptionInfo();