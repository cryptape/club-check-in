import React from 'react'
import { action, observable } from 'mobx'
import { Modal } from "antd-mobile"

const { alert } = Modal

const clubRule = '进入本慢跑俱乐部者，每周最少跑1公里，否则给大家发红包，以Keep打卡为证！本周下雨较多，可以适当放松要求，本周不做强制要求，可以不发红包，下周不下雨了大家加油跑，不然又要贴膘了~~~~~'

const log = console.log.bind(console, '### manageStore ')

class ModifyStore {
  @observable clubRule

  constructor() {
    this.clubRule = clubRule
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

