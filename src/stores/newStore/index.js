import React from 'react'
import { action, computed, observable } from 'mobx'
import { Modal } from "antd-mobile"

const log = console.log.bind(console, '### newStore ')

const { alert } = Modal

class NewStore {
  @observable clubName
  @observable clubRule
  @observable clubFunding
  @observable reportThreshold

  constructor() {
    this.clubName = ''
    this.clubRule = ''
    this.clubFunding = ''
    this.reportThreshold = ''
  }

  handleConfirmCreateClub = (history) => {
    log('点击了确定')
    history.push('./user')
  }

  @action handleCreateClub = (history) => {
    alert('社团创建成功', '您的社团ID是：#1024，快去通知社员加入吧！', [
      { text : '确定', onPress : () => this.handleConfirmCreateClub(history) },
    ])
  }

  @action onInfoChange = (value, infoType) => {
    this[infoType] = value
  }

  @computed get isInfoCompleted() {
    return this.clubName && this.clubRule && this.clubFunding && this.reportThreshold
  }
}

const newStore = new NewStore()

export default newStore

