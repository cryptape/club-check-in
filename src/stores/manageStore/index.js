import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { clubAbi, dataAbi, controlAbi, tokenAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'

const log = console.log.bind(console, '### manageStore ')

const { alert } = Modal

class ManageStore {
  @observable increaseFunding
  @observable currentClubId

  constructor() {
    this.increaseFunding = ''
    this.tokenContract = new appchain.base.Contract(tokenAbi, config.tokenContract)
    this.clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
  }

  handleOK = () => {
    log('点击了是')

    log('clubId', this.currentClubId)
    const userAddress = appchain.base.getDefaultAccount()
    const blockNumber = appchain.base.getBlockNumber()
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)

    let currentAddr = ''
    let blockNum = ''

    Promise.all([userAddress, blockNumber]).then(([fetchedUserAddr, fetchedBlockNum]) => {
      currentAddr = fetchedUserAddr
      blockNum = fetchedBlockNum
      return clubContract.methods.clubsInfo(this.currentClubId).call()
    }).then((clubDataAddr) => {
      log('clubDataAddr', clubDataAddr)
      const dataContract = new appchain.base.Contract(dataAbi, clubDataAddr)
      return dataContract.methods.controlAddress().call()
    }).then((controlAddr) => {
      log('controlAddr', controlAddr)
      const controlContract = new appchain.base.Contract(controlAbi, controlAddr)
      const tx = {
        ...transaction,
        from: currentAddr,
        validUntilBlock: blockNum + 88,
      }
      return controlContract.methods.clear().send(tx)
    }).then((txHash) => {
      return appchain.listeners.listenToTransactionReceipt(txHash.hash)
    }).then((receipt) => {
      if (receipt.errorMessage === null) {
        log('Clear successfully')
      } else {
        log('Clear failed')
        throw Error(receipt.errorMessage)
      }
    })
  }

  handleCancel = () => {
    log('点击了否')
  }

  handleIncrease = () => {
    const fundingToIncrease = this.increaseFunding * 100
    let defaultAddr = ''
    let dataAddr = ''
    let controlAddr = ''

    appchain.base.getDefaultAccount().then((accountAddr) => {
      log(accountAddr)
      defaultAddr = accountAddr
      return this.tokenContract.methods.balanceOf(accountAddr).call()
    }).then((tokens) => {
      console.log('number of tokens', tokens)
      if (tokens < fundingToIncrease) {
        alert('通知', `请确认余额充足！`, [
          { text: '好的', onPress: () => {log('余额不足，点击确认')} },
        ])
        throw Error('not enough balance.')
      }
      return this.clubContract.methods.clubsInfo(this.currentClubId).call()
    }).then((dataContractAddr) => {
      const dataConrtact = new appchain.base.Contract(dataAbi, dataContractAddr)
      return dataConrtact.methods.controlAddress().call()
    }).then((controlContractAddr) => {
      controlAddr = controlContractAddr
      return appchain.base.getBlockNumber()
    }).then((blockNum) => {
      log('funding', fundingToIncrease)
      log('defaultAddr', defaultAddr)
      log('datacontract', dataAddr)
      const tx = {
        ...transaction,
        from: defaultAddr,
        validUntilBlock: blockNum + 88,
      }
      return this.tokenContract.methods.transfer(controlAddr, fundingToIncrease).send(tx)
    }).then((txHash) => {
      return appchain.listeners.listenToTransactionReceipt(txHash.hash)
    }).then((receipt) => {
      if (receipt.errorMessage === null) {
        log('Funding increased successfully')
      } else {
        log('failed to increase funding')
        throw Error(receipt.errorMessage)
      }
    }).catch((err) => {
      log(err)
    })
  }

  @action clearPageInfo = () => {
    this.increaseFunding = ''
  }

  @action handleInput = (e) => {
    let inputValue = e.target.value

    // first round filter
    let s = ''
    for (let i = 0; i < inputValue.length; i++) {
      if ('1234567890.'.includes(inputValue[i])) {
        s += inputValue[i]
      }
    }
    inputValue = s

    // second round filter
    if (!/^\d+\.?\d{0,2}$/.test(inputValue)) {
      inputValue = inputValue.substring(0, inputValue.length - 1)
    }

    // git rid of the first 0
    if (inputValue.length > 1 && inputValue.indexOf('.') === -1) {
      if (inputValue[0] === '0') {
        inputValue = inputValue.slice(1)
      }
    }

    // set InputValue
    if (inputValue.length > 0 || inputValue === '') {
      e.target.value = inputValue
      this.increaseFunding = e.target.value
    }
  }

  @action handleSettle = () => {
    alert('活动结算', `活动结算发起后：
    1.您的社团经费将按照积分等比例分配给团员 
    2.所有的团员积分将清零是否确定？`, [
      { text: '否', onPress: this.handleCancel },
      { text: '是', onPress: this.handleOK },
    ])
  }

  @action handleFunding = () => {
    alert('通知', `是否充值？`, [
      { text: '充还是要充的', onPress: this.handleIncrease },
    ])
  }

  @computed get hasInputFunding() {
    return this.increaseFunding
  }

}

const manageStore = new ManageStore()

export default manageStore

