import { action, observable } from 'mobx'
import { clubListArrow } from "./svg"
import { playerAbi, clubAbi, dataAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'

const log = console.log.bind(console, '### clubListStore ')

class ClubListStore {
  @observable clubDataList
  @observable userClubList
  @observable clubNameList
  @observable clubIdList
  @observable clubUsers
  @observable clubUserAvatars

  constructor() {
    this.clubDataList = ''
    this.clubListArrow = clubListArrow
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

    //because user won't delete from array in contract, I need to check the flag signup
    let clubJoined = []
    for (let i = 0; i < clubDataAddrs.length; i++) {
      const dataContract = new appchain.base.Contract(dataAbi, clubDataAddrs[i])
      const isSignup = await dataContract.methods.signUps(sender).call()
      if (isSignup) {
        clubJoined.push(clubDataAddrs[i])
      }
    }

    this.clubNameList = await Promise.all(clubJoined.map(addr => {
      return new appchain.base.Contract(dataAbi, addr).methods.clubName().call()
    }))

    this.clubIdList = await Promise.all(clubJoined.map(addr => {
      return clubContract.methods.clubsIds(addr).call()
    }))

    this.clubUsers = await Promise.all(clubJoined.map(addr => {
      return new appchain.base.Contract(dataAbi, addr).methods.getMembers().call()
    }))

    this.clubUserAvatars = []
    for (let i = 0; i < this.clubUsers.length; i++) {
      const dataContract = new appchain.base.Contract(dataAbi, clubJoined[i])
      
      //club users is an array of arrays, I have to check if the user exited
      //because use only marked as exited for every club but not deleted
      //the performance is lowered for the reason
      let signedUserForSingleClub = []
      for (let j = 0; j < this.clubUsers[i].length; j++) {
        const ifSignUp = await dataContract.methods.signUps(this.clubUsers[i][j]).call()
        if(ifSignUp) {
          signedUserForSingleClub.push(this.clubUsers[i][j])  
        }
      }

      this.clubUsers[i] = signedUserForSingleClub

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

