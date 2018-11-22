import { action, computed, observable } from 'mobx'

const log = console.log.bind(console, '### registerStore ')

// address must get from Neuron-Web
const registerAddress = '0X291302034049012393Ba0414'

class RegisterStore {
  @observable files
  @observable registerName
  @observable registerAddress

  constructor () {
    this.files = []
    this.registerName = ''
    this.registerAddress = registerAddress
  }

  @action onRegisterAvatarChange = (files) => {
    this.files = files
  }

  @action onRegisterAddressChange = (value) => {
    this.registerName = value
  }

  @action handleRegister = () => {
    console.log('register button clicked')
  }

  // to check all info blanks are filled
  @computed get isInfoCompleted () {
    return this.registerName && this.files.length
  }

}

const registerStore = new RegisterStore()

export default registerStore

