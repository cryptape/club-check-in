import { action, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { clubAbi, dataAbi } from '../../contract/compiled'
import { config } from '../../config'
import { appchain } from '../../appchain'

const { alert } = Modal

const log = console.log.bind(console, '### detailStore ')

class DetailStore {
  @observable isLeader

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

  @action async checkIfLeader(clubId) {
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    const clubAddr = await clubContract.methods.clubsInfo(clubId).call();
    const dataContract = new appchain.base.Contract(dataAbi, clubAddr)
    const owner = await dataContract.methods.owner().call()
    const currentAddr = await appchain.base.getDefaultAccount()
    this.isLeader = (owner === currentAddr)
  }
}

const detailStore = new DetailStore()

export default detailStore

