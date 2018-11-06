import { observable, action } from 'mobx'

const log = console.log.bind(console, '### navStore ')

const navIcon = {
    activity: ['tabbar_act_normal.png', 'tabbar_act_highlight.png'],
    checkin: ['tabbar_sign_normal.png', 'tabbar_sign_highlight.png'],
    personal: ['tabbar_per_normal.png', 'tabbar_per_highlight.png'],
}

class NavStore {
    @observable navIcon

    constructor() {
    }

    @action handleActivity = (event) => {
        log(event.target)
        log('activity button clicked')
    }

    @action handleCheckin = () => {
        log('checkin button clicked')
    }

    @action handlePersonal = () => {
        log('personal button clicked')
    }
}

const navStore = new NavStore()

export default navStore

