import { action, computed, observable } from 'mobx'
import { playerAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'
import { handleUploadImage } from '../../utils'

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

  @action onRegisterAddressChange = (value) => {
    this.registerName = value
  }

  //check if the current address is signed up
  //get the registerName and avatarName
  @action checkIfRegistered = () => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)


    this.registerAddress = window.neuron.getAccount()

    userContract.methods.players(this.registerAddress).call()
      .then(res => {
        console.log('res', res)
        this.fetchedName = res.name
        this.registerName = res.name
        this.files = [{
          file: {
            name: res.icon,
          },
          url: config.prefixUrl + res.icon + config.imgSlim,
        }]
      })
      .then(() => {this.ifRegistered = (this.fetchedName !== undefined && this.fetchedName !== '')})
      .then(() => {console.log()})
  }

  @action handleSubmit = () => {
    if (this.ifRegistered) {
      console.log('account update')
      this.accountUpdate()
    } else {
      console.log('account sign up')
      this.accountSignUp()
    }
  }

  //sign up the current address
  accountSignUp = () => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const currentAddr = window.neuron.getAccount()
    const currentBlockNumber = appchain.base.getBlockNumber()

    Promise.all([currentAddr, currentBlockNumber]).then(([currentAddress, blockNumber]) => {
      const tx = {
        ...transaction,
        from: currentAddress,
        validUntilBlock: blockNumber + 88,
      }
      const userContract = new appchain.base.Contract(playerAbi, config.userContract)

      handleUploadImage(this.files)
        .then(res => {
          log('ok, ', res)
          if (res.hash) {
            log('res key', res.key)
            appchain.base.getBlockNumber().then(blockNum => {
              console.log('blockNumber', blockNum)
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

  accountUpdate = () => {
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

