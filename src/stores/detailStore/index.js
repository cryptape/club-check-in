import { observable, action } from 'mobx'

const log = console.log.bind(console, '### detailStore ')

class DetailStore {
	@action handleManageMember = () => {
		log('manage club member')
	}

	@action handleQuitClub = () => {
		log('quit this club')
	}
}

const detailStore = new DetailStore()

export default detailStore

