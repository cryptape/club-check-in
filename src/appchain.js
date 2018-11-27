const { config } = require('./config')

const Appchain = require('@appchain/base').default


if (typeof window.appchain !== 'undefined') {
  window.appchain = Appchain(window.appchain.currentProvider);
  window.appchain.currentProvider.setHost(config.chain);  // set CITA node IP address and port
} else {
  console.log('No appchain? You should consider trying Neuron!')
  window.appchain = Appchain(config.chain);
}

var appchain = window.appchain

module.exports = {
  appchain
}