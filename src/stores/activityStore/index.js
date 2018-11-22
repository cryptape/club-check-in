import { action, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { activityDataList } from '../../mockData'

const { alert } = Modal
const log = console.log.bind(this, '### activityStore')

class ActivityStore {
  @observable activityDataList

  constructor () {
    this.activityDataList = activityDataList
    this.maxAvatars = 5
  }

  @action handleThumbUp = () => {
    log('click thumb up')
  }

  handleConfirmReport = (e) => {
    log('handleConfirmReport')
  }

  handleCancelReport = () => {
    log('handleCancelReport')
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

