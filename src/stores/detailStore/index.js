import { action } from 'mobx'
import { Modal } from 'antd-mobile'

const { alert } = Modal

const log = console.log.bind(console, '### detailStore ')

class DetailStore {
  constructor() {
    this.isLeader = true
  }

  // TODO: how to forbid club member enter #/mange url directly go to the manage page?
  @action handleManageMember = () => {
    log('manage club member')
  }

  confirmQuit = () => {
    log('quit the club')
  }

  notQuit = () => {
    log('im just kidding')
  }

  @action handleQuitClub = () => {
    alert('提示', '退出社团您的积分将无法找回。', [
      { text: '否', onPress: this.notQuit },
      { text: '是', onPress: this.confirmQuit },
    ])
  }
}

const detailStore = new DetailStore()

export default detailStore

