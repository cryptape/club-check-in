import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { playerAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'
import { handleUploadImage } from '../../utils'

const { alert } = Modal

const log = console.log.bind(console, '### registerStore ')

class RegisterStore {
  @observable files
  @observable registerName
  @observable registerAddress
  @observable ifRegistered

  constructor() {
    this.files = []
    this.registerName = ''
    this.registerAddress = ''
    this.ifRegistered = false
    this.fetchedName = undefined
  }

  @action onRegisterAvatarChange = files => {
    this.files = files
  }

  @action handleInput = (e) => {
    let inputValue = e.target.value

    // trim space
    inputValue = inputValue.replace(/\s+/g,"")

    // set InputValue
    if (inputValue.length > 0 || inputValue === '') {
      e.target.value = inputValue
      this.registerName = e.target.value
    }
  }

  //check if the current address is signed up
  //get the registerName and avatarName
  @action checkIfRegistered = () => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)

    this.registerAddress = window.neuron.getAccount()

    userContract.methods.players(this.registerAddress).call()
      .then(res => {
        log('res', res)
        this.fetchedName = res.name
        this.registerName = res.name
        this.files = [{
          file: {
            name: res.icon,
          },
          url: `${config.prefixUrl}${res.icon}${config.imgSlim}`,
        }]
      })
      .then(() => this.ifRegistered = !!this.fetchedName)
      .catch(err => log(err))
  }

  @action handleSubmit = (history) => {
    this.ifRegistered ? this.accountUpdate(history) : this.accountSignUp(history)
  }

  handleJumpPage = (history) => {
    log('handleJumpPage')
    history.push('./user')
  }

  //sign up the current address
  accountSignUp = (history) => {
    const currentAddr = window.neuron.getAccount()
    const currentBlockNumber = appchain.base.getBlockNumber()

    Promise.all([currentAddr, currentBlockNumber]).then(([currentAddress, blockNumber]) => {
      const userContract = new appchain.base.Contract(playerAbi, config.userContract)

      handleUploadImage(this.files)
        .then(res => {
          log('ok, ', res)
          if (res.hash) {
            log('res key', res.key)
            appchain.base.getBlockNumber().then(blockNum => {
              log('blockNumber', blockNum)
              const tx = {
                ...transaction,
                from: this.registerAddress,
                validUntilBlock: blockNum + 88
              }
              log(tx)
              return userContract.methods.signIn(this.registerName, res.key).send(tx)
            }).then(setIconTx => {
              log('waiting for signup tx ' + setIconTx.hash)
              // TODO got bug here, can't get receipt correctly
              return appchain.listeners.listenToTransactionReceipt(setIconTx.hash)
            }).then(receipt => {
              if (receipt.errorMessage === null) {
                alert('通知', '注册成功', [
                  {
                    text: '确定', onPress: () => {
                      log('user sign up success')
                      this.handleJumpPage(history)
                    }
                  },
                ])
              } else {
                alert('通知', '注册失败', [
                  { text: '确定', onPress: () => log('user sign up failed') },
                ])
              }
            })
          }
        })
        .catch(err => {
          log('err', err)
        })
    })
  }

  accountUpdate = (history) => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    if (this.files.length) {
      log('pic detected')
      log('files', this.files)
      handleUploadImage(this.files)
        .then(res => {
          log('ok, ', res)
          if (res.hash) {
            log('res key', res.key)
            appchain.base.getBlockNumber().then(blockNum => {
              const tx = {
                ...transaction,
                from: this.registerAddress,
                validUntilBlock: blockNum + 88
              }
              return userContract.methods.setNameIcon(this.registerName, res.key).send(tx)
            }).then(setIconTx => {
              log('waiting for set icon tx')
              return appchain.listeners.listenToTransactionReceipt(setIconTx.hash)
            }).then(receipt => {
              if (receipt.errorMessage === null) {
                alert('通知', '更新成功', [
                  {
                    text: '确定', onPress: () => {
                      log('user info update success')
                      this.handleJumpPage(history)
                    }
                  },
                ])
              } else {
                alert('通知', '更新失败', [
                  { text: '确定', onPress: () => log('user info update failed', receipt.errorMessage) },
                ])
              }
            })
          }
        })
        .catch(err => {
          log('err', err)
        })
    } else {
      log('no pic')
    }
  }

  @computed get isInfoCompleted() {
    return this.registerName && this.files.length
  }

}

const registerStore = new RegisterStore()

export default registerStore

