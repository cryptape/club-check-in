import { observable, action } from 'mobx'

// 后台需要给的数据格式
// const data = [{
//     url: 'http://ww1.sinaimg.cn/large/d8eb23c4ly1fwsljvzfu2j20sr0srgqb.jpg',
//     id: '1111',
// }, ];

class RegisterStore {
    @observable files

    constructor() {
        this.files = []
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

