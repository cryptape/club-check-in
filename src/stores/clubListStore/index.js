
import React from "react"
import { action, observable, observe } from 'mobx'
import { clubDataList } from "../../mockData"
import { clubListArrow } from "./svg"
import { playerAbi, clubAbi, dataAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'

const log = console.log.bind(console, '### clubListStore ')

class ClubListStore {
  @observable clubDataList
  @observable userClubList
  @observable clubNameList
  @observable clubIdList
  @observable clubUsers
  @observable clubUserAvatars

  constructor() {
    this.clubDataList = clubDataList
    this.clubListArrow = clubListArrow
    // this.selectedClubID = ''
    this.maxAvatars = 7
    this.userClubList = []
    this.clubNameList = []
    this.clubIdList = []
    this.clubUsers = []
    this.clubUserAvatars = []
    this.defaultClubNum = 10
  }

  @action async getUserClubs(i) {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)

    const sender = await appchain.base.getDefaultAccount()

    const size = await userContract.methods.getUserClubsSize(sender).call()
    
    const max = i < size ? i : size

    const clubDataAddrs = await Promise.all(Array.from({length: max}).map((_, index) => {
      return userContract.methods.getUserClubs(sender, index).call()
    }))

    this.clubNameList = await Promise.all(clubDataAddrs.map(addr => {
      return new appchain.base.Contract(dataAbi, addr).methods.clubName().call()
    }))

    console.log('clubNameList', clubDataAddrs)

    this.clubIdList = await Promise.all(clubDataAddrs.map(addr => {
      return clubContract.methods.clubsIds(addr).call()
    }))

    this.clubUsers = await Promise.all(clubDataAddrs.map(addr => {
      return new appchain.base.Contract(dataAbi, addr).methods.getMembers().call()
    }))

    this.clubUserAvatars = []
    for (let i = 0; i < this.clubUsers.length; i++) {
      log('user address', this.clubUsers[i].slice())
      let singleClubAvatars = await Promise.all(this.clubUsers[i].map(addr => addr.slice()).map(addr => {
        return userContract.methods.players(addr).call()
      }))
      singleClubAvatars = singleClubAvatars.map(x => config.prefixUrl + x.icon + config.imgSlim)
      this.clubUserAvatars.push(singleClubAvatars)
    }
  }
}

const clubListStore = new ClubListStore()

export default clubListStore

