import { action, computed, observable } from 'mobx'

// data format get from back-end

// const data = [{
//     url: 'http://ww1.sinaimg.cn/large/d8eb23c4ly1fwsljvzfu2j20sr0srgqb.jpg',
//     id: '1111',
// }, ];
const log = console.log.bind(console, '### registerStore ')

// address must get from Neuron-Web
const registerAddress = '0X291302034049012393Ba0414'

class RegisterStore {
  @observable files
  @observable registerName
  @observable registerAddress

  constructor() {
    this.files = []
    this.registerName = ''
    this.registerAddress = registerAddress
  }


  @action onRegisterAvatarChange = (files) => {
    // log('files', files)
    this.files = files
    log(this.files.length)
  }

  @action onRegisterAddressChange = (value) => {
    this.registerName = value
    log(this.files)
  }

  @action handleRegister = () => {
    console.log('register button clicked')
  }

  // to check all info blanks are filled
  @computed get isInfoCompleted() {
    return this.registerName && this.files.length !== 0
  }

}

const registerStore = new RegisterStore()

export default registerStore

