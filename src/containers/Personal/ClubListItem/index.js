import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Flex,
} from 'antd-mobile'
import './clublistitem.css'

const arrowRight = <img src="jt_next2.png" alt=""/>
const avatar = <img src="avatar.png" alt=""/>

// raw data like this
const dataList = [{
    clubName: '慢跑俱乐部',
    avatar: 'avatar.png',
    clubID: 1001,
}, {
    clubName: '吃饭俱乐部',
    avatar: 'avatar.png',
    clubID: 1002,
},{
    clubName: '睡觉俱乐部',
    avatar: 'avatar.png',
    clubID: 1003,
},{
    clubName: '摸鱼俱乐部',
    avatar: 'avatar.png',
    clubID: 1004,
},{
    clubName: '加班俱乐部',
    avatar: 'avatar.png',
    clubID: 1006,
},{
    clubName: '加班俱乐部',
    avatar: 'avatar.png',
    clubID: 1006,
},{
    clubName: '加班俱乐部',
    avatar: 'avatar.png',
    clubID: 1006,
},{
    clubName: '加班俱乐部',
    avatar: 'avatar.png',
    clubID: 1006,
},];

@inject('clublistStore') @observer
class ClubListItem extends React.Component {

    render() {
        const {
            handleClubDetail,
        } = this.props.clublistStore

        const clubList = dataList.map((data, index) => {
            return (
                <Flex onClick={handleClubDetail} className='club-list-item'>
                    <div className='club-list-item-left'>
                        <div className='club-list-name'>
                            <span>{data['clubName']}</span>
                        </div>
                        <ul>
                            <li>{<img src={data['avatar']} alt=""/>}</li>
                            <li>{avatar}</li>
                            <li>{avatar}</li>
                            <li>{avatar}</li>
                            <li>{avatar}</li>
                            <li>{avatar}</li>
                        </ul>
                    </div>
                    <div className='club-list-item-right'>
                        <span>{`ID:${data['clubID']}`}</span>
                        <div className='club-list-item-icon'>
                            {arrowRight}
                        </div>
                    </div>
                </Flex>
            )
        })
        return (
            <div className='club-list'>
                {clubList}
            </div>
        )
    }
}

export default ClubListItem
