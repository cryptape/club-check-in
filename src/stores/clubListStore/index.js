import { observable, action } from 'mobx'

const log = console.log.bind(console, '### clubListStore ')

class ClubListStore {

    constructor() {
    }

    @action handleClubDetail = () => {
        log('hello')
    }
}

const clublistStore = new ClubListStore()

export default clublistStore

