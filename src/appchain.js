const { config } = require('./config')

const Appchain = require('@appchain/base').default
const appchain = Appchain(config.chain)

window.appchain = appchain

module.exports = {
  appchain
}
