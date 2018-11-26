import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { clubInfo } from '../../mockData'

const { alert } = Modal

const log = console.log.bind(console, '### manageStore ')

class ModifyStore {
  @observable clubInfo
  @observable newClubRule
  @observable newReportThreshold

  constructor() {
    this.clubInfo = clubInfo
    this.newClubRule = this.clubInfo.clubRule
    this.newReportThreshold = this.clubInfo.reportThreshold
  }

  @action clearPageInfo = () => {
    this.clubInfo = clubInfo
    this.newClubRule = this.clubInfo.clubRule
    this.newReportThreshold = this.clubInfo.reportThreshold
  }

  handleOK = () => {
    log('点击了确定')
  }

  @action onInfoChange = (value, infoType) => {
    this[infoType] = value
  }

  @action handleConfirmModify = () => {
    alert('通知', '修改成功', [
      { text: '确定', onPress: this.handleOK },
    ])
  }

  @computed get hasContentChange() {
    return this.newClubRule && this.newReportThreshold &&
      (this.newClubRule !== this.clubInfo.clubRule || this.newReportThreshold !== this.clubInfo.reportThreshold)
  }
}

const modifyStore = new ModifyStore()

export default modifyStore

