import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Flex, } from 'antd-mobile'
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
        <Link key={index} to={'/detail'} className='clubListItem__container--club-item-link'>
          <Flex onClick={handleClubDetail} className='clubListItem__container--club-item'>
            <div className='clubListItem__container--left'>
              <div className='clubListItem__content--name'>
                <span>{data.clubName}</span>
              </div>
              <ul>
                {data.avatar.map(
                  (avatar, index) => <li key={index}><img src={avatar} alt=""/></li>
                )}
              </ul>
            </div>
            <div className='clubListItem__container--right'>
              <span>{`ID: ${data.clubID}`}</span>
              <div className='clubListItem__icon--arrow-right'>
                {arrowRight}
              </div>
            </div>
          </Flex>
        </Link>
      )
    })
    return (
      <div className='clubList__container--content'>
        {clubList}
      </div>
    )
  }
}

export default ClubListItem
