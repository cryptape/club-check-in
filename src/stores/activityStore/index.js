import { action, observable } from 'mobx'

/**
 *
 * @param    {boolean}  hasReported       card has already been reported by current user, and can't be modified.
 * @param    {boolean}  hasforbiddened    card has been over reported and can't do anything else by current user.
 *
 */

const activityDataList = [{
  name : '梁高宁',
  avatar : 'avatar1.png',
  clubName : 'Cryptape慢跑俱乐部',
  checkinTime : '2018.11.04 18:36:18',
  checkinContent : '12月2日徒步活动(周日)，大家吃好喝好呀~12月2日徒步活动(周日)，大家吃好喝好呀~12月2日徒步活动(周日)，大家吃好喝好呀~12月2日徒步活动(周日)，大家吃好喝好呀~12月2日徒步活动(周日)，大家吃好喝好呀~家吃好喝好呀~12月2日徒步活动(周日)，大家吃好喝好呀~12月2日徒步活动(周日)，家吃好喝好呀~12月2日徒步活动(周日)，大家吃好喝，',
  thumbsUpMembers : ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar5.png',],
  thumbsUpTimes : 15,
  hasReported : false,
  hasforbiddened : false,
},]

// TODO: antd mobile PullToRefresh
class ActivityStore {
  @observable activityDataList

  constructor() {
    this.activityDataList = activityDataList
  }

  @action handleHello = () => {
    console.log('hello', this.name)
  }

}

const activityStore = new ActivityStore()

export default activityStore

