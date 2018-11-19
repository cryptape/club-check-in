import { action, observable } from 'mobx'
import React from "react"
import {clubDataList} from "../../mockData"

const log = console.log.bind(console, '### clubListStore ')


const arrowRight = <img src="jt_next2.png" alt=""/>

class ClubListStore {
  @observable clubDataList

  constructor() {
    this.clubDataList = clubDataList
    this.arrowRight = arrowRight
    this.maxAvatars = 7
  }

  @action handleClubDetail = () => {
    log('hello')
  }

}

const clublistStore = new ClubListStore()

export default clublistStore

