import {observable, action} from 'mobx'
import React from "react";

const log = console.log.bind(console, '### clubListStore ')

// raw data like this
const dataList = [{
    clubName: '慢跑俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1001,
}, {
    clubName: '吃饭俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1002,
}, {
    clubName: '睡觉俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1003,
}, {
    clubName: '摸鱼俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1004,
}, {
    clubName: '加班俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1006,
}, {
    clubName: '加班俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1007,
}, {
    clubName: '加班俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1008,
}, {
    clubName: '加班俱乐部',
    avatar: ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'],
    clubID: 1009,
},];

const arrowRight = <img src="jt_next2.png" alt=""/>

class ClubListStore {
    @observable dataList

    constructor() {
        this.dataList = dataList
        this.arrowRight = arrowRight
    }

    @action handleClubDetail = () => {
        log('hello')
    }
}

const clublistStore = new ClubListStore()

export default clublistStore

