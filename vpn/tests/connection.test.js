const VPNConnection = require('../connection');
const assert = require('assert');

describe('VPNConnection', () => {
  it('should connect to VPN', async () => {
    const vpnConnection = new VPNConnection();
    await vpnConnection.connect();
    assert.notStrictEqual(vpnConnection.vpnProcess, null);
  });

  it('should disconnect from VPN', async () => {
    const vpnConnection = new VPNConnection();
    await vpnConnection.connect();
    await vpnConnection.disconnect();
    assert.strictEqual(vpnConnection.vpnProcess, null);
  });

  it('should get VPN logs', async () => {
    const vpnConnection = new VPNConnection();
    const logs = await vpnConnection.getLogs();
    assert.notStrictEqual(logs, '');
  });
});