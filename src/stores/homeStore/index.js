import { action, observable } from 'mobx'

const log = console.log.bind(console, '### homeStore')

class HomeStore {
  @observable isUser

  constructor() {
    this.isUser = false
  }

  @action hasRegister = () => {
    // interact with chain to decide isUser value
    this.isUser = true
  }
}

const homeStore = new HomeStore()

export default homeStore

