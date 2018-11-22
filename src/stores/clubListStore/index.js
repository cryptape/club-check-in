import React from 'react'
import { action, observable } from 'mobx'
import { clubDataList } from '../../mockData'
import { clubListArrow } from './svg'

const log = console.log.bind(console, '### clubListStore ')

class ClubListStore {
  @observable clubDataList

  constructor() {
    this.clubDataList = clubDataList
    this.clubListArrow = clubListArrow
    this.maxAvatars = 7
  }

  @action handleClubDetail = () => {
    log('hello')
  }

}

const clublistStore = new ClubListStore()

export default clublistStore

