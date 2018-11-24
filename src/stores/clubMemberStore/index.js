import React from 'react'
import { action, observable } from 'mobx'
import { memberDataList, detailPageClubInfo } from '../../mockData'

const log = console.log.bind(console, '### clubMemberStore ')

class ClubMemberStore {
  @observable memberDataList
  @observable detailPageClubInfo

  constructor() {
    this.memberDataList = memberDataList.sort((a, b) => b.points - a.points)
    this.detailPageClubInfo = detailPageClubInfo
  }

  // check leader according to member address
  @action checkLeader = (address) => {
    return '0X291302034049012393Ba0415' === address
  }

}

const clubMemberStore = new ClubMemberStore()

export default clubMemberStore

