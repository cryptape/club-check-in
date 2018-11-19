import { action, observable } from 'mobx'
import { activityDataList } from "../../mockData"

// TODO: antd mobile PullToRefresh
class ActivityStore {
  @observable activityDataList

  constructor() {
    this.activityDataList = activityDataList
    this.maxAvatars = 7
  }

  @action handleHello = () => {
    console.log('hello', this.name)
  }

}

const activityStore = new ActivityStore()

export default activityStore

