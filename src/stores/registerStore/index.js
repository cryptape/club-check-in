import { observable, action } from 'mobx'

class RegisterStore {
    @observable name

    constructor() {
        this.name = 'Register button'
    }

    @action handleHello = () => {
        console.log('hello', this.name)
    }
}

const registerStore = new RegisterStore()

export default registerStore

