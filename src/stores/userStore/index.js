import { action, observable } from 'mobx'
import { Modal, } from 'antd-mobile'
import { createIcon, joinIcon } from './svg'
import { clubAbi, controlAbi, dataAbi, playerAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'

const log = console.log.bind(console, '### personalStore ')

const { prompt, alert } = Modal

class UserStore {

  @observable userAddr
  @observable userName
  @observable userThumbPic

  constructor() {
    this.userAddr = ''
    this.userName = ''
    this.userThumbPic = ''
    this.joinIcon = joinIcon
    this.createIcon = createIcon
  }

  @action
  async getUserInfo() {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const sender = await window.neuron.getAccount()
    const userInfo = await userContract.methods.players(sender).call()
    this.userAddr = sender
    this.userName = userInfo['name']
    this.userThumbPic = userInfo['icon']
  }

  @action handleJoin = () => {
    prompt(
      '加入新社团',
      '社团ID',
      [
        { text: '放弃', onPress: () => log('放弃加入社团') },
        { text: '确定', onPress: value => this.joinClub(value) },
      ],
      'default',
      null,
      ['输入你想加入的社团ID吧']
    )
  }

  joinClub = value => {
    log(`输入的内容:${value}`)
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    clubContract.methods.clubsInfo(value).call().then((clubDataAddr) => {
      const clubDataContract = new appchain.base.Contract(dataAbi, clubDataAddr)
      clubDataContract.methods.controlAddress().call().then((controlAddr) => {
        console.log('control addr', controlAddr)
        const clubControlContract = new appchain.base.Contract(controlAbi, controlAddr)

        const currentAddr = window.neuron.getAccount()
        const currentBlockNumber = appchain.base.getBlockNumber()

        Promise.all([currentAddr, currentBlockNumber]).then(([currentAddress, blockNumber]) => {
          const tx = {
            ...transaction,
            from: currentAddress,
            validUntilBlock: blockNumber + 88,
          }

          clubControlContract.methods.join().send(tx).then((res) => {
            log('transaction valid: ', res)
            return appchain.listeners.listenToTransactionReceipt(res.hash)
          }).then(receipt => {
            if (receipt.errorMessage === null) {
              alert('通知', '加入社团成功', [
                { text: '好的', onPress: () => log('join success!') },
              ])
            } else {
              alert('通知', '加入社团失败', [
                { text: '好的', onPress: () => log('join failed!') },
              ])
              throw new Error(receipt.errorMessage)
            }
          }).catch(err => {
            log('Failed to join the club.', err)
          })
        })
      }).catch(err => {
        alert('通知', '社团不存在', [
          { text: '好的', onPress: () => log('join failed!') },
        ])
        log('Club does not exist.', err)
      })
    })
  }

}

const userStore = new UserStore()

export default userStore

