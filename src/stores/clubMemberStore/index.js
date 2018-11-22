import React from 'react'
import { action, observable } from 'mobx'
import { memberDataList } from '../../mockData'

const log = console.log.bind(console, '### clubMemberStore ')

class ClubMemberStore {
  @observable memberDataList

  constructor() {
    this.memberDataList = memberDataList.sort((a, b) => b.points - a.points)
  }

  // check leader according to member address
  @action checkLeader = (address) => {
    return '0X291302034049012393Ba0415' === address
  }

}

const clubmemberStore = new ClubMemberStore()

export default clubmemberStore

