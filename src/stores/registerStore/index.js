import { action, computed, observable } from 'mobx'

// data format get from back-end

// const data = [{
//     url: 'http://ww1.sinaimg.cn/large/d8eb23c4ly1fwsljvzfu2j20sr0srgqb.jpg',
//     id: '1111',
// }, ];
const log = console.log.bind(console, '### registerStore ')

const registerAddress = '0X291302034049012393Ba0414'

class RegisterStore {
  @observable files
  @observable name
  @observable registerAddress

  constructor() {
    this.files = []
    this.name = ''
    this.registerAddress = registerAddress
  }


  @action onRegisterAvatarChange = (files) => {
    // log('files', files)
    this.files = files
  }

  @action onRegisterAddressChange = (value) => {
    this.name = value
  }

  @action handleRegister = () => {
    console.log('register button clicked')
  }

  // to check all info blanks are filled
  @computed get isInfoCompleted() {
    return this.name && this.files.length === 1
  }

}

const registerStore = new RegisterStore()

export default registerStore

