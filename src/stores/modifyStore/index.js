import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { clubInfo } from '../../mockData'
import { appchain } from '../../appchain'
import { clubAbi, dataAbi, controlAbi } from '../../contract/compiled'
import { config } from '../../config'
import transaction from '../../contract/transaction'

const { alert } = Modal

const log = console.log.bind(console, '### manageStore ')

class ModifyStore {
  @observable clubInfo
  @observable newClubRule
  @observable newReportThreshold
  @observable ClubID

  constructor() {
    this.clubInfo = ''
    this.newClubRule = ''
    this.newReportThreshold = ''
  }

  @action async clearPageInfo() {
    this.clubInfo = {}
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    const clubAddr = await clubContract.methods.clubsInfo(this.clubID).call()
    const dataContract = new appchain.base.Contract(dataAbi, clubAddr)

    const fetchedClubName = await dataContract.methods.clubName().call()
    const fetchedClubDesc = await dataContract.methods.clubDesc().call()
    const fetchedClubReportLimit = await dataContract.methods.reportLimit().call()

    this.clubInfo = {
      clubName: fetchedClubName,
      clubID: this.clubID,
      clubRule: fetchedClubDesc,
      reportThreshold: fetchedClubReportLimit,
    }

    this.newClubRule = fetchedClubDesc
    this.newReportThreshold = fetchedClubReportLimit
  }

  handleOK = () => {
    log('点击了确定')
    log('club Id', this.clubID)
    const defaultAccount = window.neuron.getAccount()
    const blockNumber = appchain.base.getBlockNumber()
     Promise.all([defaultAccount, blockNumber]).then(([currentAddr, blockNum]) => {
      const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
      clubContract.methods.clubsInfo(this.clubID).call().then((clubAddr) => {
        const dataContract = new appchain.base.Contract(dataAbi, clubAddr)
        return dataContract.methods.controlAddress().call()
      }).then((controlAddr) => {
        console.log('controlAddr', controlAddr)
        const controlContract = new appchain.base.Contract(controlAbi, controlAddr)
         const tx = {
          ...transaction,
          from: currentAddr,
          validUntilBlock: blockNum + 88,
        }
        const reportLlimitToUpdate = parseInt(this.newReportThreshold)
         // return controlContract.methods.setClubDescribe(this.newClubRule).send(tx)
        return controlContract.methods.setClubDescAndReportLimit(this.newClubRule, reportLlimitToUpdate).send(tx)
      }).then((txHash) => {
        console.log(txHash)
      })
    }).catch((err) => {
      console.log('err', err)
    })
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

