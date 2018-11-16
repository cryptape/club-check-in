import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Flex } from 'antd-mobile'
import './activityCardList.css'

const activityDataList = [{
  name : '梁高宁',
  clubName : 'Cryptape慢跑俱乐部',
  avatar : 'avatar1.png',
  checkinTime : '2018.11.04 18:36:18',
  checkinContent : '12月2日徒步活动(周日)，大家吃好喝好呀~ ',
  thumbsUpMembers : ['avatar.png', 'avatar1.png', 'avatar6.png', 'avatar3.png', 'avatar5.png',],
  thumbsUpTimes : 15,
  hasReported : false,
  hasforbiddened : false,
},]

@inject('activityStore') @observer
class ActivityCardList extends React.Component {

  render() {

    const { activityDataList } = this.props.activityStore

    const activityCardList = activityDataList.map((card, index) => {
      return (
        <Card key={index} className='activityCard__container-content'>
          <Card.Header
            title={
              <div>
                <div className='activityCard__content-member-name'>
                  {card.name}
                </div>
                <div className='activeCard__content-club-name'>
                  {card.clubName}
                </div>
              </div>
            }
            thumb={card.avatar}
          />
          <Card.Body>
            <Flex justify='center'>
              <div className='activeCard__container-checkin-content'>
                <div className='activeCard__content-checkin-content'>
                  {card.checkinContent}
                </div>
                <div className='activeCard__content-checkin-time'>
                  {card.checkinTime}
                </div>
              </div>
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <ul className='activeCard__container--club-item'>
                {card.thumbsUpMembers.map((avatar, index) => {
                  if (index <= 7) {
                    return <li key={index}><img src={avatar} alt=""/></li>
                  }
                })}
              </ul>
            }
            extra={
              <div>
                <img src={'report_highlight.png'} alt=""/>
                <div>被举报次数过多，已扣分</div>
              </div>}
          />
        </Card>
      )
    })

    return (
      <div className='activityCardList__container-content'>
        {activityCardList}
      </div>
    )
  }
}

export default ActivityCardList
