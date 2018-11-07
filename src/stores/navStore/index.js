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
        log('activity button clicked')
    }

    @action handleCheckin = () => {
        log('checkin button clicked')
    }

    @action handlePersonal = () => {
        log('personal button clicked')
    }

    // TODO change active img
    // @action changeImg = (event) => {
    //     let self = event.target
    //     let par = self.closest('.navbar-item')
    //     let navI = par.classList[0]
    //     let img = par.querySelector('img')
    //     let imgSrc = img.getAttribute('src')
    //     imgSrc === navIcon[navI][0] ? img.setAttribute('src', navIcon[navI][1])
    //         : img.setAttribute('src', navIcon[navI][0])
    //
    // }

    @action toggleActive = (event) => {
        let old = document.querySelector('.active-nav-item')
        old.classList.remove('active-nav-item')
        let self = event.target
        let par = self.closest('.navbar-item')
        par.classList.add('active-nav-item')
    }
}

const navStore = new NavStore()

export default navStore

