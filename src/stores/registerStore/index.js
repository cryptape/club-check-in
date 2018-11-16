import { observable, action, autorun } from 'mobx'

// data format get from back-end

// const data = [{
//     url: 'http://ww1.sinaimg.cn/large/d8eb23c4ly1fwsljvzfu2j20sr0srgqb.jpg',
//     id: '1111',
// }, ];
const log = console.log.bind(console, '### registerStore ')

class RegisterStore {
  @observable files
  @observable isInfoCompleted

  constructor() {
    this.files = []
    this.isInfoCompleted = false
  }

  @action onChange = (files) => {
    this.files = files
  }

  @action handleRegister = () => {
    console.log('register button clicked')
  }
}

const registerStore = new RegisterStore()

export default registerStore

