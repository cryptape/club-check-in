import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Flex, } from 'antd-mobile'
import './clubListItem.css'

@inject('clubListStore') @observer
class ClubListItem extends React.Component {

  render() {
    const {
      clubDataList,
      clubListArrow,
      maxAvatars,
    } = this.props.clubListStore

    const clubList = clubDataList.map((data, index) => {
      return (
        <Link key={index} to={`/detail/clubID=${data.clubID}`} className='clubListItem__container--club-item-link'>
          <Flex className='clubListItem__container--club-item'>
            <div className='clubListItem__container--left'>
              <div className='clubListItem__content--name'>
                <span>{data.clubName}</span>
              </div>
              {data.avatar.length ? <ul>
                {data.avatar.map((avatar, index) => {
                  if (index <= maxAvatars) {
                    return <li key={index}><img src={avatar} alt=""/></li>
                  }
                })}
              </ul> : ''}
            </div>
            <div id={data.clubID} className='clubListItem__container--right'>
              <span>{`ID: ${data.clubID}`}</span>
              <div className='clubListItem__icon--arrow-right'>
                {clubListArrow}
              </div>
            </div>
          </Flex>
        </Link>

      )
    })
    return (
      <div>
        <Flex>
          <div className='user__content--club-banner'>已加入社团</div>
        </Flex>
        <div className='clubList__container--content'>
          {clubList}
        </div>
      </div>
    )
  }
}

export default ClubListItem
