import {observable, action} from 'mobx'

const log = console.log.bind(console, '### personalStore ')

class PersonalStore {

    @action handleJoin = () => {
        log('handleJoin btn')
    }

    @action handleCreate = () => {
        log('handleCreate btn')
    }

    @action handleConfig = () => {
        log('switch to register page')
    }
}

const personalStore = new PersonalStore()

export default personalStore

