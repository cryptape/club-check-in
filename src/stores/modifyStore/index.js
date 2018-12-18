import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { appchain } from '../../appchain'
import { clubAbi, controlAbi, dataAbi } from '../../contract/compiled'
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

  @action
  async clearPageInfo() {
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

  @action handleConfirmModify = () => {
    log('club Id', this.clubID)
    const defaultAccount = window.neuron.getAccount()
    const blockNumber = appchain.base.getBlockNumber()
    Promise.all([defaultAccount, blockNumber]).then(([currentAddr, blockNum]) => {
      const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
      clubContract.methods.clubsInfo(this.clubID).call().then((clubAddr) => {
        const dataContract = new appchain.base.Contract(dataAbi, clubAddr)
        return dataContract.methods.controlAddress().call()
      }).then(controlAddr => {
        log('controlAddr', controlAddr)
        const controlContract = new appchain.base.Contract(controlAbi, controlAddr)
        const tx = {
          ...transaction,
          from: currentAddr,
          validUntilBlock: blockNum + 88,
        }
        const reportLlimitToUpdate = parseInt(this.newReportThreshold)
        if (this.newClubRule.replace(/\s+/g, '') === '') {
          alert('通知', '社团规则不能为空。', [
            { text: '好的', onPress: () => log('club rule is empty.') },
          ])
          throw Error('club rule is empty.')
        } 
        return controlContract.methods.setClubDescAndReportLimit(this.newClubRule, reportLlimitToUpdate).send(tx)
      }).then(modifyTx => {
        log('waiting for set icon tx')
        return appchain.listeners.listenToTransactionReceipt(modifyTx.hash)
      }).then(receipt => {
        if (receipt.errorMessage === null) {
          alert('通知', '修改社团信息成功', [
            {
              text: '确定', onPress: () => log('club info update success')
            },
          ])
        } else {
          alert('通知', '修改社团信息失败', [
            { text: '确定', onPress: () => log('user info update failed', receipt.errorMessage) },
          ])
        }
      }).catch(err => {
        log('err', err)
      })
    })
  }

  @action onInfoChange = (value, infoType) => {
    if(infoType === 'newReportThreshold' && value === '0') {
      alert('通知', '举报阈值不能为0', [
        { text: '确定', onPress: () => log("newReportThreshold can't be zero") },
      ])
      this.newReportThreshold =  this.clubInfo.reportThreshold
    } else {
      this[infoType] = value
    }
  }

  @computed get hasContentChange() {
    return this.newClubRule && this.newReportThreshold &&
      (this.newClubRule !== this.clubInfo.clubRule || this.newReportThreshold !== this.clubInfo.reportThreshold)
  }
}

const modifyStore = new ModifyStore()

export default modifyStore

