import React from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import {
    Flex, Icon,
} from 'antd-mobile'
import './clubListItem.css'

@inject('clublistStore') @observer
class ClubListItem extends React.Component {

    // TODO  if avatar number is less than 6
    render() {
        const {
            handleClubDetail,
            clubDataList,
            arrowRight,
        } = this.props.clublistStore

        const clubList = clubDataList.map((data, index) => {
            return (
                <Link to={'/detail'}>
                    <Flex onClick={handleClubDetail} key={index} className='club-list-item'>
                        <div className='club-list-item-left'>
                            <div className='club-list-name'>
                                <span>{data['clubName']}</span>
                            </div>
                            <ul>
                                <li>{<img src={data['avatar'][0]} alt=""/>}</li>
                                <li>{<img src={data['avatar'][1]} alt=""/>}</li>
                                <li>{<img src={data['avatar'][2]} alt=""/>}</li>
                                <li>{<img src={data['avatar'][3]} alt=""/>}</li>
                                <li>{<img src={data['avatar'][4]} alt=""/>}</li>
                                <li>{<img src={data['avatar'][5]} alt=""/>}</li>
                            </ul>
                        </div>
                        <div className='club-list-item-right'>
                            <span>{`ID:${data['clubID']}`}</span>
                            <div className='club-list-item-icon'>
                                {arrowRight}
                            </div>
                        </div>
                    </Flex>
                </Link>
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
