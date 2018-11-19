import React from 'react'
import { action, observable } from 'mobx'
import { Modal } from "antd-mobile"
import { clubInfo } from "../../mockData"

const { alert } = Modal

const log = console.log.bind(console, '### manageStore ')


class ModifyStore {
  @observable clubInfo

  constructor() {
    this.clubInfo = clubInfo
  }

  handleOK = () => {
    log('点击了确定')
  }

  @action handleConfirmModify = () => {
    alert('通知', '修改成功', [
      { text : '确定', onPress : this.handleOK },
    ])
  }
}

const modifyStore = new ModifyStore()

export default modifyStore

