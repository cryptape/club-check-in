import { action, observable, toJS } from 'mobx'
import { Modal } from 'antd-mobile'
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
    this.maxAvatars = 5
    this.refreshing = false
    this.checkInEventsToShow = []
  }



  @action async getActivities() {
    const userContract = new appchain.base.Contract(playerAbi, config.userContract)
    const clubContract = new appchain.base.Contract(clubAbi, config.clubContract)

    const maxClubNumber = await clubContract.methods.number().call()

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
      return acc.concat(events.map(event => ({addr, round, event: event})))
    }, []).sort((a,b) => b.event - a.event)

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
        const singlePlayer = await userContract.methods.players(eventSupports[j]).call()
        supportersAvatar.push(constructPicUrl(singlePlayer['icon']))
      }
      
      const reportLimit = await dataContract.methods.reportLimit().call()
      const reports = await dataContract.methods.getEventReports(sortedClubEvents[i]['round'], sortedClubEvents[i]['event']).call()
      const reported = reports.length > 0
      const forbidden = reports.length >= parseInt(reportLimit)

      checkinEvents.push({
        eventId: eventInfo['id'],
        clubAddr: sortedClubEvents[i]['addr'],
        name: authorName,
        avatar: authorAvatar,
        clubName: clubName,
        checkinTime: convertTsToDate(parseInt(eventInfo['id'])),
        checkinContent: eventInfo['text'],
        postPic: constructPicUrl(eventInfo['imgUrl']),
        thumbUpMembers: supportersAvatar,
        thumbUpTimes: eventSupports.length,
        hasThumbUp: false,
        hasReported: reported,
        isMember: true,
        hasforbiddened: forbidden,
      })
    }

    this.checkInEventsToShow = checkinEvents  
  }

  @action handleThumbUp = (card) => {
    log('click thumb up', toJS(card))
    alert(
      '成功', 
      '点赞成功了，快去让Ta请你吃点什么吧', 
      [
        { 
          text: '吼啊！', 
          onPress: () => {
            const eventId = parseInt(card['eventId'])
            const clubDataAddr = card['clubAddr']
            const defaultAddr = appchain.base.getDefaultAccount()
            const blockNum = appchain.base.getBlockNumber()

            Promise.all([defaultAddr, blockNum]).then(([currentAddr, blockNumber]) => {
              const clubDataContract = new appchain.base.Contract(dataAbi, clubDataAddr)
              clubDataContract.methods.controlAddress().call().then((controlAddr) => {
                const contorlContract = new appchain.base.Contract(controlAbi, controlAddr)
                const tx = {
                  ...transaction,
                  from: currentAddr,
                  validUntilBlock: blockNumber + 88,
                }
                return contorlContract.methods.support(eventId).send(tx)
              }).then((txHash) => {
                return appchain.listeners.listenToTransactionReceipt(txHash.hash)
              }).then((receipt) => {
                if (receipt.errorMessage === null) {
                  console.log('Support successfully')
                } else {
                  console.log('Support failed')
                  throw Error(receipt.errorMessage)
                }
              })
            })
            log('吼啊！')
          } 
        },
      ])
  }

  handleConfirmReport = (card) => {
    log('handleConfirmReport')
    log('card', toJS(card))
    const eventId = parseInt(card.eventId)
    const clubDataAddr = card.clubAddr
    const defaultAddr = appchain.base.getDefaultAccount()
    const blockNum = appchain.base.getBlockNumber()
    Promise.all([defaultAddr, blockNum]).then(([currentAddr, blockNumber]) => {
      const clubDataContract = new appchain.base.Contract(dataAbi, clubDataAddr)
      clubDataContract.methods.controlAddress().call().then((controlAddr) => {
        const contorlContract = new appchain.base.Contract(controlAbi, controlAddr)
        const tx = {
          ...transaction,
          from: currentAddr,
          validUntilBlock: blockNumber + 88,
        }
        return contorlContract.methods.report(eventId).send(tx)
      }).then((txHash) => {
        return appchain.listeners.listenToTransactionReceipt(txHash.hash)
      }).then((receipt) => {
        if (receipt.errorMessage === null) {
          console.log('Report successfully')
        } else {
          console.log('Report failed')
          throw Error(receipt.errorMessage)
        }
      })
    })

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

  @action handleReport = (card) => {
    log('click report')
    alert('举报', '举报该用户打卡记录有问题，超过一定举报数后，该打卡记录将不予分配积分并做相应惩罚.', [
      { text: '否', onPress: this.handleCancelReport },
      { text: '是', onPress: () => this.handleConfirmReport(card) },
    ])
  }

}

const activityStore = new ActivityStore()

export default activityStore

