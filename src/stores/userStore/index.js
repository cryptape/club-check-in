import React from 'react'
import { action, observable } from 'mobx'
import { Modal, } from 'antd-mobile'
import { createIcon, joinIcon } from './svg'
import { appchain } from '../../appchain'
import { config } from '../../config'
import { playerAbi, clubAbi, dataAbi } from '../../contract/compiled'

const log = console.log.bind(console, '### personalStore ')

const thumbPic = 'avatar.png'
const { prompt } = Modal

class UserStore {

  @observable userAddr
  @observable userName
  @observable userThumbPic

  constructor() {
    this.userAddr = ''
    this.userName = ''
    this.userThumbPic = ''
    this.thumbPic = thumbPic
    this.joinIcon = joinIcon
    this.createIcon = createIcon
  }

  @action async getUserInfo() {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const sender = await appchain.base.getDefaultAccount()
    const userInfo = await userContract.methods.players(sender).call()
    this.userAddr = sender
    this.userName = userInfo['name']
    this.userThumbPic= userInfo['icon']
  }

  @action handleJoin = () => {
    prompt('加入新社团', '社团ID', [
      { text: '确定', onPress: value => log(`输入的内容:${value}`) },
    ], 'default', null, ['输入你想加入的社团ID吧'])
  }

  @action joinClub = () => {
    
  }

}

const userStore = new UserStore()

export default userStore

