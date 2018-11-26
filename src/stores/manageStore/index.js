import React from 'react'
import { action, computed, observable } from 'mobx'
import { Modal } from 'antd-mobile'

const log = console.log.bind(console, '### manageStore ')

const { alert } = Modal

class ManageStore {
  @observable increaseFunding
  //TODO cause increase funding and init funding combine to one function, so we need to know which club was selected.
  //TODO need /#/manage --> /#/manage/1001
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

  @action handleInput = (e) => {
    let inputValue = e.target.value

    // first round filter
    let s = ''
    for (let i = 0; i < inputValue.length; i++) {
      if('1234567890.'.includes(inputValue[i])) {
        s += inputValue[i]
      }
    }
    inputValue = s

    // second round filter
    if (! /^\d+\.?\d{0,2}$/.test(inputValue)) {
      inputValue = inputValue.substring(0, inputValue.length - 1)
    }

    // git rid of the first 0
    if(inputValue.length > 1 && inputValue.indexOf('.') === -1) {
      if(inputValue[0] === '0') {
        inputValue = inputValue.slice(1)
      }
    }

    // set InputValue
    if (inputValue.length > 0 || inputValue === '') {
      e.target.value = inputValue
      this.increaseFunding = e.target.value
      // log('increaseFunding', this.increaseFunding)
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

