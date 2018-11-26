import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { clubName } from '../../mockData'
import { errorCode, handleUploadImage, timeConverter } from '../../utils'

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
    this.files = []
    history.push('./activity')
  }

  @action clearPageInfo = () => {
    this.files = []
    this.selectedClubName = ''
    this.checkinContent = ''
  }

  handleCheckinSuccess = (history) => {
    log('success')
    return (
      alert('打卡成功', '您已成功打卡，并获得系统奖励的10个积分，请勿重复或虚假打卡，否则会被判罚积分。', [{
        text: '确定',
        onPress: () => this.handleConfirmCheckin(history)
      }])
    )
  }

  handleCheckinFailed = (errCode) => {
    log('fail, error code:', errCode)
    return (
      alert('打卡失败', errorCode[errCode], [{
        text: '确定',
        onPress: () => this.files = []
      }])
    )
  }

  @action handleCheckin = (history) => {
    if (this.files.length) {
      log('有图')
      handleUploadImage(this.files)
        .then(res => {
          log('ok, ', res)
          if (res.hash) {
            log('pic name', res.key)
            log(timeConverter(Math.round(new Date().getTime() / 1000)))
            //TODO interact with chain
          }
        })
        .catch((err) => {
          this.handleCheckinFailed(err.code)
        })
    } else {
      log('no pic')
      log(timeConverter(Math.round(new Date().getTime() / 1000)))
      this.handleCheckinSuccess(history)
    }
  }

  // TODO there is a bug, when you go to the checkin page and didn't check
  @computed get isInfoCompleted() {
    return this.selectedClubName && (this.checkinContent || this.files.length)
  }
}

const checkinStore = new CheckinStore()

export default checkinStore
