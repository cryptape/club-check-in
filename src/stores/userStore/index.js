import { action } from 'mobx'
import React from "react"
import { Modal, } from 'antd-mobile'

const log = console.log.bind(console, '### personalStore ')

const thumbPic = 'avatar.png'
const joinIcon = <img src="per_join.png" alt=""/>
const createIcon = <img src="per_create.png" alt=""/>
const { prompt } = Modal

class UserStore {
  constructor() {
    this.thumbPic = thumbPic
    this.joinIcon = joinIcon
    this.createIcon = createIcon
  }

  @action handleJoin = () => {
    prompt('加入新社团', '社团ID', [
      { text : '确定', onPress : value => console.log(`输入的内容:${value}`) },
    ], 'default', null, ['输入你想加入的社团ID吧'])
  }

}

const userStore = new UserStore()

export default userStore

