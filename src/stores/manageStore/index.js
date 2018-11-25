import React from 'react'
import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { playerAbi, clubAbi, dataAbi, controlAbi, tokenAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'
import { constructPicUrl, convertTsToDate } from '../../utils'
// import {} from 

const log = console.log.bind(console, '### manageStore ')

const { alert } = Modal

class ManageStore {
  @observable increaseFunding
  @observable currentClubId
  //TODO cause increase funding and init funding combine to one function, so we need to know which club was selected.
  //TODO need /#/manage --> /#/manage/1001
  constructor() {
    this.increaseFunding = ''
    this.tokenContract = new appchain.base.Contract(tokenAbi, config.tokenContract)
    this.clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
  }

  handleOK = () => {
    log('点击了是')
  }

  handleCancel = () => {
    log('点击了否')
  }

  handleIncrease = () => {
    const fundingToIncrease = parseInt(this.increaseFunding)
    let defaultAddr = ''
    let dataAddr = ''

    appchain.base.getDefaultAccount().then((accountAddr) => {
      console.log(accountAddr)
      defaultAddr = accountAddr
      return this.tokenContract.methods.balanceOf(accountAddr).call()
    }).then((tokens) => {
      console.log('number of tokens', tokens)
      if (tokens < fundingToIncrease) {
        throw Error('not enough balance.')
      }
      return this.clubContract.methods.clubsInfo(this.currentClubId).call()
    }).then((dataContractAddr) => {
      dataAddr = dataContractAddr
      return appchain.base.getBlockNumber()
    }).then((blockNum) => {
      console.log('funding', fundingToIncrease)
      console.log('defaultAddr', defaultAddr)
      console.log('datacontract', dataAddr)
      const tx = {
        ...transaction,
        from: defaultAddr,
        validUntilBlock: blockNum + 88,
      }
      return this.tokenContract.methods.transfer(dataAddr, this.increaseFunding).send(tx)
    }).then((txHash) => {
      return appchain.listeners.listenToTransactionReceipt(txHash.hash)
    }).then((receipt) => {
      if (receipt.errorMessage === null) {
        console.log('Funding increased successfully')
      } else {
        console.log('failed to increase funding')
        throw Error(receipt.errorMessage)
      }
    })

    // this.tokenContract.methods.balanceOf()
  }

  @action handleIncreaseChange = (value) => {
    this.increaseFunding = value
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
    alert('通知', `社长你真有钱！`, [
      { text: '确定', onPress: this.handleIncrease },
    ])
  }

  @computed get hasInputFunding() {
    return this.increaseFunding
  }

}

const manageStore = new ManageStore()

export default manageStore

