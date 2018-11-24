import { action, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { activityDataList } from '../../mockData'

const { alert } = Modal
const log = console.log.bind(this, '### activityStore')

class ActivityStore {
  @observable activityDataList
  @observable refreshing
  constructor() {
    this.activityDataList = activityDataList
    this.maxAvatars = 5
    this.refreshing = false
  }

  @action handleThumbUp = () => {
    log('click thumb up')
    alert('成功', '点赞成功了，快去让Ta请你吃点什么吧', [
      { text: '吼啊！', onPress: () => {log('吼啊！')} },
    ])
  }

  handleConfirmReport = (e) => {
    log('handleConfirmReport')
  }

  handleCancelReport = () => {
    log('handleCancelReport')
  }

  @action onRefresh = () => {
    this.refreshing = true
    log('refreshing')
    setTimeout(() => {
      this.refreshing = false
      log('end refreshing')
    }, 1000)
  }

  @action handleReport = () => {
    log('click report')
    alert('举报', '举报该用户打卡记录有问题，超过一定举报数后，该打卡记录将不予分配积分并做相应惩罚.', [
      { text: '否', onPress: this.handleCancelReport },
      { text: '是', onPress: this.handleConfirmReport },
    ])
  }

}

const activityStore = new ActivityStore()

export default activityStore

