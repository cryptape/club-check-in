import React from "react"
import { observable, action } from 'mobx'
import { Modal } from "antd-mobile"

const log = console.log.bind(console, '### newStore ')

const { alert } = Modal

class NewStore {

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
}

const newStore = new NewStore()

export default newStore

