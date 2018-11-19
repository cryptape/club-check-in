import React from "react"
import { action } from 'mobx'
import { Modal, } from 'antd-mobile'
import {createIcon, joinIcon} from "./svg"

const log = console.log.bind(console, '### personalStore ')

const thumbPic = 'avatar.png'
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

