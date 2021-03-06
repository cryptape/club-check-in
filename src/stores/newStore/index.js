import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { appchain } from '../../appchain'
import transaction from '../../contract/transaction'
import { proxyAbi, proxyBin } from '../../contract/compiled'
import { config } from '../../config'

const log = console.log.bind(console, '### newStore ')

const { alert } = Modal

class NewStore {
  @observable clubName
  @observable clubRule
  @observable reportThreshold

  constructor() {
    this.clubName = ''
    this.clubRule = ''
    this.reportThreshold = ''
  }

  @action clearPageInfo = () => {
    this.clubName = ''
    this.clubRule = ''
    this.reportThreshold = ''
  }

  handleConfirmCreateClub = (history) => {
    log('点击了确定')
    history.push('./user')
  }

  @action handleCreateClub = (history) => {
    alert('创建社团', '确定创建社团吗？社团一旦创建无法解散。', [
      { text: '否', onPress: () => history.push('./user') },
      { text: '是', onPress: () => this.createClub(history) },
    ])
  }

  createClub = (history) => {

    const currentAddr = window.neuron.getAccount()
    const currentBlockNumber = appchain.base.getBlockNumber()

    //check validity of input parameters
    if (this.clubName.replace(/\s+/g, '') === '') {
      alert('通知', '社团名称不能为空!', [
        { text: '确定', onPress: () => log("club name can't be empty.") },
      ])
      return
    } else if (this.clubRule.replace(/\s+/g, '') === '') {
      alert('通知', '社团规则不能为空!', [
        { text: '确定', onPress: () => log("club rule can't be empty.") },
      ])
      return 
    } else if (this.reportThreshold === '0') {
      alert('通知', '举报阈值不能为0！')
      return
    }

    Promise.all([currentAddr, currentBlockNumber]).then(([currentAddress, blockNumber]) => {

      const tx = {
        ...transaction,
        from: currentAddress,
        validUntilBlock: blockNumber + 88,
      }

      const proxyContract = new appchain.base.Contract(proxyAbi)

      proxyContract.deploy({
        data: proxyBin,
        arguments: [
          config.clubContract,
          config.tokenContract,
          config.userContract,
          this.clubName,
          this.clubRule,
          this.reportThreshold,
          //single bonus
          10,
          //punishment
          15,
          //support bonus
          1,
        ]
      })
        .send(tx)
        .then(res => {
          log('transaction valid: ', res.hash)
          return appchain.listeners.listenToTransactionReceipt(res.hash)
        })
        .then(receipt => {
          if (receipt.errorMessage === null) {
            alert('通知', '社团创建成功', [
              { text: '好的', onPress: () => this.handleConfirmCreateClub(history) },
            ])
          } else {
            alert('通知', '社团创建失败', [
              { text: '好的', onPress: () => log('社团创建失败') },
            ])
            throw new Error(receipt.errroMessage)
          }
        })
    }).catch(err => {
      log('Someting wrong in proxy contract deployment', err)
    })
  }

  @action onInfoChange = (value, infoType) => {
    if (infoType === 'reportThreshold' && Number(value) === 0) {
      // alert('通知', '举报阈值不能设置为0!', [
      //   { text: '确定', onPress: () => log("reportThreshold can't be zero") },
      // ])
      this.reportThreshold = ''
    } else {
      this[infoType] = value
    }
  }

  @computed get isInfoCompleted() {
    return this.clubName && this.clubRule && this.reportThreshold && this.reportThreshold !== '0'
  }
}

const newStore = new NewStore()

export default newStore

