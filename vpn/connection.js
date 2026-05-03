const { exec } = require('child_process');
const fs = require('fs');

class VPNConnection {
  constructor() {
    this.vpnProcess = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.vpnProcess = exec('openvpn --config /opt/axentx/freedom-link/vpn/config.ovpn', (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      if (this.vpnProcess) {
        this.vpnProcess.kill();
        this.vpnProcess = null;
        resolve();
      } else {
        reject(new Error('VPN connection is not established'));
      }
    });
  }

  getLogs() {
    return new Promise((resolve, reject) => {
      fs.readFile('/opt/axentx/freedom-link/vpn/logs/vpn.log', 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = VPNConnection;