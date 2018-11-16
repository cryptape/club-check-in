import React from "react"
import { observable, action } from 'mobx'

const log = console.log.bind(console, '### clubMemberStore ')

// raw data like this
const memberDataList = [{
  name : 'realwwy',
  avatar : 'avatar.png',
  address : '0X291302034049012393Ba0414',
  points : '100'
}, {
  name : '梁高宁',
  avatar : 'avatar1.png',
  address : '0X291302034049012393Ba0415',
  points : '2018'
}, {
  name : '可',
  avatar : 'avatar3.png',
  address : '0X291302034049012393Ba0414',
  points : '990'
}, {
  name : '南木修思',
  avatar : 'avatar4.png',
  address : '0X291302034049012393Ba0414',
  points : '415'
}, {
  name : '泉下月出',
  avatar : 'avatar5.png',
  address : '0X291302034049012393Ba0414',
  points : '334'
}, {
  name : 'Trust you',
  avatar : 'avatar6.png',
  address : '0X291302034049012393Ba0414',
  points : '719'
},]

class ClubMemberStore {
  @observable memberDataList

  constructor() {
    this.memberDataList = memberDataList.sort((a,b) => b.points - a.points)
  }

  // check leaded according to member address
  @action checkLeader = (address) => {
    return '0X291302034049012393Ba0415' === address
  }

}

const clubmemberStore = new ClubMemberStore()

export default clubmemberStore

