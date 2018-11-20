import React from "react"
import { Redirect } from 'react-router-dom'
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

  handleConfirmCreateClub = () => {
    log('点击了确定')
  }

  @action handleCreateClub = () => {
    // TODO after click confirm button, need jump to user page
    alert('社团创建成功', '您的社团ID是：#1024，快去通知社员加入吧！', [
      { text : '确定', onPress : this.handleConfirmCreateClub },
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

