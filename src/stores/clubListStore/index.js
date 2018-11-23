import React from 'react'
import { action, observable } from 'mobx'
import { clubDataList } from '../../mockData'
import { clubListArrow } from './svg'

const log = console.log.bind(console, '### clubListStore ')

class ClubListStore {
  @observable clubDataList
  // @observable selectedClubID

  constructor() {
    this.clubDataList = clubDataList
    this.clubListArrow = clubListArrow
    // this.selectedClubID = ''
    this.maxAvatars = 7
  }

  // @action getClubID = (e) => {
  //   log('hello')
  //   const item = e.target
  //   log('item', item)
  //   const par = item.closest('.clubListItem__container--club-item-link')
  //   log('par', par)
  //   this.selectedClubID = par.querySelector('.clubListItem__container--right').id
  //   log('clubID', this.selectedClubID)
  // }

}

const clubListStore = new ClubListStore()

export default clubListStore

