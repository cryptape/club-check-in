import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Flex,
} from 'antd-mobile'
import './clublistitem.css'

@inject('clublistStore') @observer
class ClubListItem extends React.Component {

    render() {
        const {
            handleClubDetail,
            dataList,
            arrowRight,
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
                            <li>{<img src={data['avatar']} alt=""/>}</li>
                            <li>{<img src={data['avatar']} alt=""/>}</li>
                            <li>{<img src={data['avatar']} alt=""/>}</li>
                            <li>{<img src={data['avatar']} alt=""/>}</li>
                            <li>{<img src={data['avatar']} alt=""/>}</li>
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
