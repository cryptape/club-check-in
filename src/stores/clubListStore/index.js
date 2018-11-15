import { observable, action } from 'mobx'
import React from "react";

const log = console.log.bind(console, '### clubListStore ')

// raw data like this
const clubDataList = [{
  clubName : 'Cryptape慢跑俱乐部',
  avatar : ['avatar5.png', 'avatar1.png', 'avatar6.png',],
  clubID : 1001,
}, {
  clubName : '宇宙无敌撸猫社',
  avatar : ['avatar6.png', 'avatar4.png', 'avatar.png',],
  clubID : 1002,
}, {
  clubName : 'Cryptape羽毛球社',
  avatar : ['avatar5.png', 'avatar1.png', 'avatar4.png', 'avatar.png',],
  clubID : 1003,
}, {
  clubName : 'Cryptape篮球社',
  avatar : ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png','avatar.png', 'avatar1.png',],
  clubID : 1004,
}, {
  clubName : '小黑裙俱乐部',
  avatar : ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png',],
  clubID : 1006,
}, {
  clubName : '腹肌马甲线俱乐部',
  avatar : ['avatar.png', 'avatar3.png', 'avatar4.png', 'avatar5.png',],
  clubID : 1007,
}, {
  clubName : '偶尔加班俱乐部',
  avatar : ['avatar3.png', 'avatar1.png', 'avatar5.png',],
  clubID : 1008,
}, {
  clubName : '每天加班俱乐部',
  avatar : ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar5.png',],
  clubID : 1009,
},]

const arrowRight = <img src="jt_next2.png" alt=""/>

class ClubListStore {
  @observable clubDataList

  constructor() {
    this.clubDataList = clubDataList
    this.arrowRight = arrowRight
  }

  @action handleClubDetail = () => {
    log('hello')
  }
}

const clublistStore = new ClubListStore()

export default clublistStore

