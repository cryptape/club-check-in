import { action, computed, observable } from 'mobx'
import { Modal } from "antd-mobile"
import { clubName } from "../../mockData"

const { alert } = Modal


const log = console.log.bind(console, '### checkinStore')

class CheckinStore {
  @observable files
  @observable clubName
  @observable selectedClubName
  @observable checkinContent

  constructor() {
    this.files = []
    this.clubName = clubName
    this.selectedClubName = ''
    this.checkinContent = ''
  }

  @action onFilesChange = (files) => {
    this.files = files
  }

  @action onCheckinContentChange = (value) => {
    this.checkinContent = value
    log(this.checkinContent)
  }

  @action handleSelectClub = (value) => {
    log('选择的社团是：', value)
    const extra = document.querySelector('.am-list-extra')
    extra.innerHTML = value
    this.selectedClubName = value
  }

  handleConfirmCheckin = (history) => {
    log('handleConfirmCheckin')
    history.push('./activity')
  }

  @action handleCheckin = (history) => {
    alert('打卡成功', '您已成功打卡，并获得系统奖励的10个积分，请勿重复或虚假打卡，否则会被判罚积分。', [
      { text : '确定', onPress : () => this.handleConfirmCheckin(history) },
    ])
  }

  @computed get isInfoCompleted() {
    return this.selectedClubName && (this.checkinContent || this.files.length)
  }

}

const checkinStore = new CheckinStore()

export default checkinStore

