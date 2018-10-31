import { observable, action } from 'mobx'

class EventStore {
    @observable name

    constructor() {
        this.name = 'club check-in'
    }

    @action handleHello = () => {
        console.log('hello', this.name)
    }

}

const eventStore = new EventStore()

export default eventStore

