import { action, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { clubAbi, dataAbi, controlAbi } from '../../contract/compiled'
import { config } from '../../config'
import { appchain } from '../../appchain'
import transaction from '../../contract/transaction'

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

  confirmQuit = (clubId) => {
    log('quit the club')
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    const defaultAccount = window.neuron.getAccount()
    const currentBlockNumber = appchain.base.getBlockNumber()
    Promise.all([defaultAccount, currentBlockNumber]).then(([currentAddr, blockNum]) => {
      clubContract.methods.clubsInfo(clubId).call().then((dataAddr) => {
       const dataContract = new appchain.base.Contract(dataAbi, dataAddr)
       return dataContract.methods.controlAddress().call()
     }).then((controlAddr) => {
       const controlContract = new appchain.base.Contract(controlAbi, controlAddr)
       const tx = {
         ...transaction,
         from: currentAddr,
         validUntilBlock: blockNum + 88,
       }
       return controlContract.methods.exit().send(tx)
     }).then((txHash) => {
       return appchain.listeners.listenToTransactionReceipt(txHash.hash)
     }).then((receipt) => {
       if (receipt.errorMessage === null) {
         log('exit successfully')
       } else {
         log('exit failed')
         throw Error(receipt.errorMessage)
       }
     })
   }).catch(error => {
     log('error happens when exit club', error)
   })
  }

  notQuit = () => {
    log('im just kidding')
  }

  @action handleQuitClub = (clubId) => {
    alert('提示', '退出社团您的积分将无法找回。', [
      { text: '否', onPress: this.notQuit },
      { text: '是', onPress: () => this.confirmQuit(clubId) },
    ])
  }

  @action async checkIfLeader(clubId) {
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    const clubAddr = await clubContract.methods.clubsInfo(clubId).call();
    const dataContract = new appchain.base.Contract(dataAbi, clubAddr)
    const owner = await dataContract.methods.owner().call()
    const currentAddr = await window.neuron.getAccount()
    this.isLeader = (owner === currentAddr)
  }
}

const detailStore = new DetailStore()

export default detailStore

