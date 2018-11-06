import { observable, action } from 'mobx'

const log = console.log.bind(console, '### personalStore ')

class PersonalStore {

    @action handleJoin = () => {
        log('handleJoin btn')
    }

    @action handleCreate = () => {
        log('handleCreate btn')
    }
}

const personalStore = new PersonalStore()

export default personalStore

