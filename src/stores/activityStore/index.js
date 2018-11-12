import { observable, action } from 'mobx'

class ActivityStore {
  @observable name

  constructor() {
    this.name = 'club check-in'
  }

  @action handleHello = () => {
    console.log('hello', this.name)
  }

}

const activityStore = new ActivityStore()

export default activityStore

