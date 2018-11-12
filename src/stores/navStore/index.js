import React from "react"
import {observable, action} from 'mobx'
import {
	activityIcon,
	checkinIcon,
	personalIcon,
} from './svg'

const log = console.log.bind(console, '### navStore ')

class NavStore {

	@observable activityIcon
	@observable checkinIcon
	@observable personalIcon

	constructor() {
		this.checkinIcon = checkinIcon
		this.activityIcon = activityIcon
		this.personalIcon = personalIcon
	}

	@action handleActivity = (event) => {
		log('activity button clicked')
		this.toggleActive(event)
	}

	@action handleCheckin = (event) => {
		log('checkin button clicked')
		this.toggleActive(event)
	}

	@action handlePersonal = (event) => {
		log('personal button clicked')
		this.toggleActive(event)
	}

	toggleActive = (event) => {
		const old = document.querySelector('.active-nav-item')
		old.classList.remove('active-nav-item')
		const self = event.target
		const par = self.closest('.navbar-item')
		par.classList.add('active-nav-item')
	}
}

const navStore = new NavStore()

export default navStore

