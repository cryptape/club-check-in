import { action, observable } from 'mobx'
import { playerAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'

const log = console.log.bind(console, '### homeStore')

class HomeStore {
  @observable isUser

  constructor() {
    this.isUser = false
  }

  @action async hasRegister() {
    // interact with chain to decide isUser value
    this.isUser = true
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const sender = window.neuron.getAccount()
    const player = await userContract.methods.players(sender).call()
    this.isUser = !!player.name
  }
}

const homeStore = new HomeStore()

export default homeStore

