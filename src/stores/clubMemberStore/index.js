import { action, observable } from 'mobx'
import { playerAbi, clubAbi, dataAbi, tokenAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import { constructPicUrl } from '../../utils'

const log = console.log.bind(console, '### clubMemberStore ')

class ClubMemberStore {
  @observable memberDataList
  @observable detailPageClubInfo
  @observable currentClubId

  constructor() {
    this.memberDataList = []
    this.detailPageClubInfo = ''
    this.clubOwner = ''
  }

  @action async getMemberDataList(){
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const tokenContract = new appchain.base.Contract(tokenAbi, config.tokenContract)

    const clubAddr = await clubContract.methods.clubsInfo(this.currentClubId).call()
    const dataContract = new appchain.base.Contract(dataAbi, clubAddr)
    this.clubOwner = await dataContract.methods.owner().call()
    const controlAddr = await dataContract.methods.controlAddress().call()

    const clubName = await dataContract.methods.clubName().call()
    const clubDesc = await dataContract.methods.clubDesc().call()
    const clubTotal = await tokenContract.methods.balanceOf(controlAddr).call()

    this.detailPageClubInfo = {
      clubName: clubName,
      clubID: this.currentClubId,
      clubRule: clubDesc,
      clubFunding: clubTotal / 100,
    }

    const members = await dataContract.methods.getMembers().call()
    const round = await dataContract.methods.round().call()

    let totalBonus = 0
    for (let i = 0; i < members.length; i++) {
      const playerBonus = await dataContract.methods.memberBonus(round, members[i]).call()
      totalBonus += parseInt(playerBonus)
    }
    
    this.memberDataList = []
    for (let i = 0; i < members.length; i++) {
      const playerAddr = members[i]

      //continue if the player exited
      const isPlayerSignUp = await dataContract.methods.signUps(playerAddr).call()
      if (!isPlayerSignUp) {
        continue
      }

      const playerInfo = await userContract.methods.players(playerAddr).call()
      const playerName = playerInfo['name']
      const avatar = constructPicUrl(playerInfo['icon'])
      const points = await dataContract.methods.memberBonus(round, playerAddr).call()
      
      const bonus = 
      totalBonus === 0 || parseInt(points) === 0 ?
      0 : (points / totalBonus) * clubTotal 

      this.memberDataList.push({
        name: playerName,
        avatar: avatar,
        address: playerAddr,
        points: points,
        bonus: bonus,
      })
    }
  }

  // check leader according to member address
  @action checkLeader = (address) => {
    return this.clubOwner === address
  }

}

const clubMemberStore = new ClubMemberStore()

export default clubMemberStore

