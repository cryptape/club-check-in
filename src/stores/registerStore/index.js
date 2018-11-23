import { action, computed, observable } from 'mobx'
import { playerAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'

const log = console.log.bind(console, '### registerStore ')

// address must get from Neuron-Web
const registerAddress = '0X291302034049012393Ba0414'

class RegisterStore {
  @observable files
  @observable registerName
  @observable registerAddress

  constructor() {
    this.files = []
    this.registerName = ''
    this.registerAddress = registerAddress
  }

  @action onRegisterAvatarChange = (files) => {
    this.files = files
  }

  @action onRegisterAddressChange = (value) => {
    this.registerName = value
  }

  @action handleRegister = () => {
    console.log('register button clicked')
  }

  //check if the current address is signed up
  @action checkIfRegistered = () => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    appchain.base.getDefaultAccount().then(sender => {
      userContract.methods.players(sender).call().then(res => console.log(res))  
    })
  }

  //sign up the current address
  @action accountSignUp = () => {
    const userContract= new appchain.base.Contract(playerAbi, config.userContract)
    const currentAddr = appchain.base.getDefaultAccount()
    const currentBlockNumber = appchain.base.getBlockNumber()

    Promise.all([currentAddr, currentBlockNumber]).then(([currentAddress, blockNumber]) => {
      const tx = {
        ...transaction,
        from: currentAddress,
        validUntilBlock: blockNumber + 88,
      }
      const userContract = new appchain.base.Contract(playerAbi, config.userContract)
      return userContract.methods.signIn('sampleName', 'sampleUrl').send(tx)
    }).then(result => {
      log('waiting for transaction result')
      return appchain.listeners.listenToTransactionReceipt(result.hash)
    }).then(recepit => {
      if (recepit.errorMessage === null) {
        log('sign up success')
      } else {
        log('sign up failed, ', recepit.errorMessage)
        throw new Error(recepit.errorMessage)
      }
    }).catch(err => {
      log('error', err)
    })
  }

  @action getUserInfo = () => {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    appchain.base.getDefaultAccount().then(sender => {
      userContract.methods.players(sender).call().then((res) => {
        return res
      }).then((res) => {
        log(res)
      })
    })
  }


  // to check all info blanks are filled
  @computed get isInfoCompleted() {
    return this.registerName && this.files.length
  }

}

const registerStore = new RegisterStore()

export default registerStore

