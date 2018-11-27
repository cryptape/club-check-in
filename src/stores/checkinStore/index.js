import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { errorCode, handleUploadImage, timeConverter } from '../../utils'
import { playerAbi, clubAbi, dataAbi, controlAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'

const { alert } = Modal

const log = console.log.bind(console, '### checkinStore')

class CheckinStore {
  @observable files
  @observable clubName
  @observable selectedClubName
  @observable checkinContent
  @observable clubAddrList
  @observable clubNameList
  @observable clubIdList

  constructor() {
    this.files = []
    this.clubName = ''
    this.selectedClubName = ''
    this.checkinContent = ''
    this.clubAddrList = []
    this.clubNameList = []
    this.clubIdList = []
    this.clubData = []
    this.selectedClubAddr = ''
  }

  @action clearPageInfo = () => {
    this.files = []
    this.selectedClubName = ''
    this.checkinContent = ''
  }

  @action async getRegisteredClubs(){
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    
    const sender = await window.neuron.getAccount()
    
    const size = await userContract.methods.getUserClubsSize(sender).call()

    this.clubAddrList = await Promise.all(Array.from({length: size}).map((_, index) => {
      return userContract.methods.getUserClubs(sender, index).call()
    }))

    this.clubNameList = await Promise.all(this.clubAddrList.map(addr => {
      return new appchain.base.Contract(dataAbi, addr).methods.clubName().call()
    }))

    this.clubIdList = await Promise.all(this.clubAddrList.map(addr => {
      return clubContract.methods.clubsIds(addr).call()
    }))

    for (let i = 0; i < this.clubAddrList.length; i++) {
      this.clubData.push({
        clubName: this.clubNameList[i],
        clubAddr: this.clubAddrList[i]
      })
    }

    log('clubData', this.clubData)

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
    this.selectedClubAddr = this.clubData.filter((x) => {
       return x['clubName'] === value[0] 
      })
      .map(x => x['clubAddr'])

    log('selected club addr: '+ this.selectedClubAddr)
  }

  handleConfirmCheckin = (history) => {
    log('handleConfirmCheckin')
    history.push('./activity')
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


  @action async handleCheckin(history) {
    log(history)

    //get current block number and default address
    const blockNumber = await appchain.base.getBlockNumber()
    const defaultAccount = await window.neuron.getAccount()

    //get control contract addr
    const clubAddr = this.selectedClubAddr[0]
    const clubDataContract = new appchain.base.Contract(dataAbi, clubAddr)
    const clubControlAddr = await clubDataContract.methods.controlAddress().call()

    //get current text
    const checkInText = this.checkinContent
    let checkInImg = 'NA'
    
    //construct transaction
    const tx = {
      ...transaction,
      from: defaultAccount,
      validUntilBlock: blockNumber + 88,
    }

    if (this.files.length) {
      checkInImg = await handleUploadImage(this.files)
      checkInImg = checkInImg['key']
      log('checkinimg',checkInImg)
    }

    const clubControlContract = new appchain.base.Contract(controlAbi, clubControlAddr)
    const txHash = await clubControlContract.methods.checkin(checkInImg, checkInText).send(tx)            
    const receipt = await appchain.listeners.listenToTransactionReceipt(txHash.hash)

    log('receipt', receipt)

    if (receipt.errorMessage === null) {
      log('checkin success')
      this.handleCheckinSuccess(history)
    } else {
      log('checkin failed', receipt)
      this.handleCheckinFailed()
    }
  }

  @computed get isInfoCompleted() {
    return this.selectedClubName && (this.checkinContent || this.files.length)
  }
}

const checkinStore = new CheckinStore()

export default checkinStore
