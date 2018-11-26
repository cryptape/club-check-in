const { config } = require('./config')

const Appchain = require('@appchain/base').default


if (typeof window.nervos !== 'undefined') {
  window.appchain = Appchain(window.nervos.currentProvider);
  window.appchain.currentProvider.setHost(config.chain);  // set CITA node IP address and port
} else {
  console.log('No nervos? You should consider trying Neuron!')
  window.appchain = Appchain(config.chain);
}

var appchain = window.appchain

module.exports = {
  appchain
}