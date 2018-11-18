import React from "react"
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

  handleOK = () => {
    log('点击了是')
  }

  handleCancel = () => {
    log('点击了否')
  }

  @action handleCreateClub = () => {
    alert('社团创建成功', '您的社团ID是：#1024，快去通知社员加入吧！', [
      { text : '否', onPress : this.handleCancel },
      { text : '是', onPress : this.handleOK },
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

