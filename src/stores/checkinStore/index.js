import { action, observable } from 'mobx'
import { Modal } from "antd-mobile"

const { alert } = Modal

// data format get from pic server

// const data = [{
//     url: 'http://ww1.sinaimg.cn/large/d8eb23c4ly1fwsljvzfu2j20sr0srgqb.jpg',
//     id: '1111',
// }, ];

// raw data like this
const clubName = [
  {
    "value" : "Cryptape慢跑俱乐部 (#1001)",
    "label" : "Cryptape慢跑俱乐部 (#1001)",
  }, {
    "value" : "宇宙无敌撸猫社 (#1002)",
    "label" : "宇宙无敌撸猫社 (#1002)",
  }, {
    "value" : "Cryptape篮球社 (#1003)",
    "label" : "Cryptape篮球社 (#1003)",
  }, {
    "value" : "小黑裙俱乐部 (#1004)",
    "label" : "小黑裙俱乐部 (#1004)",
  }, {
    "value" : "腹肌马甲线俱乐部 (#1005)",
    "label" : "腹肌马甲线俱乐部 (#1005)",
  }, {
    "value" : "偶尔加班俱乐部 (#1006)",
    "label" : "偶尔加班俱乐部 (#1006)",
  }, {
    "value" : "每天加班俱乐部 (#1007)",
    "label" : "每天加班俱乐部 (#1007)",
  }, {
    "value" : "Cryptape羽毛球社 (#1008)",
    "label" : "Cryptape羽毛球社 (#1008)",
  },
]

const log = console.log.bind(console, '### checkinStore')

class CheckinStore {
  @observable files
  @observable clubName

  constructor() {
    this.files = []
    this.clubName = clubName
  }

  @action onChange = (files) => {
    this.files = files
  }

  @action handleSelectClub = (value) => {
    log('选择的社团是：', value)
    const extra = document.querySelector('.am-list-extra')
    extra.innerHTML = value
  }

  handleOK = () => {
    log('handleOK function')
  }

  @action handleCheckin = () => {
    alert('打卡成功', '您已成功打卡，并获得系统奖励的10个积分，请勿重复或虚假打卡，否则会被判罚积分。', [
      { text : '确定', onPress : this.handleOK },
    ])
  }
}

const checkinStore = new CheckinStore()

export default checkinStore

