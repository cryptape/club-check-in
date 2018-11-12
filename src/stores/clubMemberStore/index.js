import React from "react"
import { observable, action } from 'mobx'

const log = console.log.bind(console, '### clubMemberStore ')

// raw data like this
const memberDataList = [{
  name : 'realwwy',
  avatar : 'avatar.png',
  address : '0X291302034049012393Ba0414',
  points : '10'
}, {
  name : '一个已经结婚的人',
  avatar : 'avatar1.png',
  address : '0X291302034049012393Ba0414',
  points : '20'
}, {
  name : '可',
  avatar : 'avatar3.png',
  address : '0X291302034049012393Ba0414',
  points : '99'
}, {
  name : '南木修思',
  avatar : 'avatar4.png',
  address : '0X291302034049012393Ba0414',
  points : '45'
}, {
  name : '泉下月出',
  avatar : 'avatar5.png',
  address : '0X291302034049012393Ba0414',
  points : '34'
}, {
  name : 'Trust you',
  avatar : 'avatar6.png',
  address : '0X291302034049012393Ba0414',
  points : '79'
},]

class ClubMemberStore {
  @observable memberDataList

  constructor() {
    this.memberDataList = memberDataList
  }

  // @action.bound
  // componentDidMount() {
  //     log('componentDidMount')
  // }

}

const clubmemberStore = new ClubMemberStore()

export default clubmemberStore

