import { observable, action } from 'mobx'

class HomeStore {
	componentDidMount = () => {
		console.log('hello from homepage')
	}
}

const homeStore = new HomeStore()

export default homeStore

