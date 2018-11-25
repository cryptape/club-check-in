import { action, observable } from 'mobx'
import { Modal } from 'antd-mobile'
import { activityDataList } from '../../mockData'
import { playerAbi, clubAbi, dataAbi, controlAbi } from '../../contract/compiled'
import { appchain } from '../../appchain'
import { config } from '../../config'
import transaction from '../../contract/transaction'
import { constructPicUrl, convertTsToDate } from '../../utils'

const { alert } = Modal
const log = console.log.bind(this, '### activityStore')

class ActivityStore {
  @observable activityDataList
  @observable refreshing
  @observable checkInEventsToShow

  constructor() {
    this.activityDataList = activityDataList
    this.maxAvatars = 5
    this.refreshing = false
    this.checkInEventsToShow = []
  }

  @action async getActivities() {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)

    const maxClubNumber = await clubContract.methods.number().call()
    log('maxClubMember', maxClubNumber)

    let currentClubs = []
    for (let i = config.originalClubId; i <= maxClubNumber; i++) {
      const dataAddr = await clubContract.methods.clubsInfo(i).call()
      const dataContract = new appchain.base.Contract(dataAbi, dataAddr)
      const dataAddrRound = await dataContract.methods.round().call()
      const dataEvents = await dataContract.methods.getCurrentEventByRound(dataAddrRound).call()
      currentClubs.push({
        addr: dataAddr,
        round: dataAddrRound,
        events: dataEvents,
      })
    }

    //get all event ids and sort them
    const sortedClubEvents = currentClubs.reduce((acc, {addr, round, events}) => {
      return acc.concat(events.map(event => ({addr, round, event: event})));
    }, []).sort((a,b) => b.event - a.event);

    console.log(sortedClubEvents);

    let checkinEvents = []
    for (let i = 0; i < sortedClubEvents.length; i++) {
      const dataContract = new appchain.base.Contract(dataAbi, sortedClubEvents[i]['addr'])
      const eventInfo = await dataContract.methods.checkinEvents(sortedClubEvents[i]['round'], sortedClubEvents[i]['event']).call()
      const player = await userContract.methods.players(eventInfo['author']).call()
      const authorAvatar = constructPicUrl(player['icon'])
      const authorName = player['name']
      const clubName = await dataContract.methods.clubName().call()
      const eventSupports = await dataContract.methods.getEventSupports(sortedClubEvents[i]['round'], sortedClubEvents[i]['event']).call()
      let supportersAvatar = []
      for (let j = 0; j < eventSupports.length; j++) {
        const singlePlayer = await userContract.methods.players(eventInfo['author']).call()
        supportersAvatar.push(singlePlayer['icon'])
      }
      console.log('eventSupports', eventSupports)

      checkinEvents.push({
        name: authorName,
        avatar: authorAvatar,
        clubName: clubName,
        checkinTime: convertTsToDate(parseInt(eventInfo['id'])),
        checkinContent: eventInfo['text'],
        postPic: constructPicUrl(eventInfo['imgUrl']),
        thumbUpMembers: supportersAvatar,
        thumbUpTimes: eventSupports.length,
        hasThumbUp: false,
        hasReported: false,
        isMember: true,
        hasforbiddened: false,
      })
    }

    console.log(checkinEvents)  
    this.checkInEventsToShow = checkinEvents  
  }

  @action handleThumbUp = () => {
    log('click thumb up')
    alert('成功', '点赞成功了，快去让Ta请你吃点什么吧', [
      { text: '吼啊！', onPress: () => {log('吼啊！')} },
    ])
  }

  handleConfirmReport = (e) => {
    log('handleConfirmReport')
  }

  handleCancelReport = () => {
    log('handleCancelReport')
  }

  @action onRefresh = () => {
    this.refreshing = true
    log('refreshing')
    setTimeout(() => {
      this.refreshing = false
      log('end refreshing')
    }, 1000)
  }

  @action handleReport = () => {
    log('click report')
    alert('举报', '举报该用户打卡记录有问题，超过一定举报数后，该打卡记录将不予分配积分并做相应惩罚.', [
      { text: '否', onPress: this.handleCancelReport },
      { text: '是', onPress: this.handleConfirmReport },
    ])
  }

}

const activityStore = new ActivityStore()

export default activityStore

