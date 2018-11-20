import React from 'react'
import { action, computed, observable } from 'mobx'
import { Modal } from "antd-mobile"

const log = console.log.bind(console, '### manageStore ')

const { alert } = Modal

class ManageStore {
  @observable increaseFunding

  constructor() {
    this.increaseFunding = ''
  }

  handleOK = () => {
    log('点击了是')
  }

  handleCancel = () => {
    log('点击了否')
  }

  handleIncrease = () => {
    log('有钱了')
  }

  @action handleIncreaseChange = (value) => {
    this.increaseFunding = value
  }

  @action handleSettle = () => {
    alert('活动结算', `活动结算发起后：
    1.您的社团经费将按照积分等比例分配给团员 
    2.所有的团员积分将清零是否确定？`, [
      { text : '否', onPress : this.handleCancel },
      { text : '是', onPress : this.handleOK },
    ])
  }

  @action handleFunding = () => {
    alert('通知', `社长你真有钱！`, [
      { text : '确定', onPress : this.handleIncrease },
    ])
  }

  @computed get hasInputFunding() {
    return this.increaseFunding
  }

}

const manageStore = new ManageStore()

export default manageStore

