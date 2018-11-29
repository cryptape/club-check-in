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

  constructor() {
    this.files = []
    this.registerName = ''
    this.registerAddress = ''
    this.ifRegistered = false
    this.fetchedName = undefined
  }

  @action onRegisterAvatarChange = (files) => {
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
      // log('registerName', this.registerName)
    }
  }

  handleJumpPage = (history) => {
    log('handleJumpPage', history)
    history.push('./user')
  }

  //check if the current address is signed up
  //get the registerName and avatarName
  @action checkIfRegistered = () => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    appchain.base.getDefaultAccount().then(sender => {
      this.registerAddress = sender
      userContract.methods.players(sender).call()
        .then(res => {
          console.log('Fetched name', this.fetchedName)
          this.fetchedName = res.name
          console.log('Fetched name', this.fetchedName)
          this.registerName = res.name
          this.files = [{
            file: {
              name: res.icon,
            },
            url: config.prefixUrl + res.icon + config.imgSlim,
          }]
        })
        .then(() => {
          this.ifRegistered = (this.fetchedName !== undefined && this.fetchedName !== '')
        })
        .then(() => {console.log()})
    })
  }

  @action handleSubmit = (history) => {
    log('handleSubmit history', history)
    if (this.ifRegistered) {
      console.log('account update')
      this.accountUpdate(history)
    } else {
      console.log('account sign up')
      this.accountSignUp(history)
    }
  }

  //sign up the current address
  accountSignUp = (history) => {
    log('accountSignUp history', history)
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const currentAddr = appchain.base.getDefaultAccount()
    const currentBlockNumber = appchain.base.getBlockNumber()

    Promise.all([currentAddr, currentBlockNumber]).then(([currentAddress, blockNumber]) => {
      const tx = {
        ...transaction,
        from: currentAddress,
        validUntilBlock: blockNumber + 88,
      }

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
              return userContract.methods.signIn(this.registerName, res.key).send(tx)
            }).then((setIconTx) => {
              log('waiting for signup tx')
              return appchain.listeners.listenToTransactionReceipt(setIconTx.hash)
            }).then((receipt) => {
              if (receipt.errorMessage === null) {
                log('user sign up success')
                alert('通知', '注册成功', [
                  {
                    text: '确定', onPress: () => {
                      log('user sign up success', history)
                      this.handleJumpPage(history)
                    }
                  },
                ])
              } else {
                log('user sign up failed', receipt.errorMessage)
              }
            })
          }
        })
        .catch((err) => {
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
            }).then((setIconTx) => {
              log('waiting for set icon tx')
              return appchain.listeners.listenToTransactionReceipt(setIconTx.hash)
            }).then((receipt) => {
              if (receipt.errorMessage === null) {
                log('user info update success')
                alert('通知', '注册成功', [
                  {
                    text: '确定', onPress: () => {
                      log('user sign up success')
                      this.handleJumpPage(history)
                    }
                  },
                ])
              } else {
                log('user info update failed', receipt.errorMessage)
              }
            }).catch(err => {
              log('error', err)
            })
          }
        })
        .catch((err) => {
          log('err', err)
        })
    } else {
      log('no pic')
    }
  }

  // to check all info blanks are filled
  @computed get isInfoCompleted() {
    return this.registerName && this.files.length
  }

}

const registerStore = new RegisterStore()

export default registerStore

