import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Flex, PullToRefresh } from 'antd-mobile'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import './activityCardList.css'

@inject('activityStore') @observer
class ActivityCardList extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.activityStore
  }

  render() {
    const {
      activityDataList,
      maxAvatars,
      handleReport,
      handleThumbUp,
      onRefresh,
      refreshing,
      checkInEventsToShow,
    } = this.store

    const activityCardList = checkInEventsToShow.map((card, index) => {
      return (
        <Flex key={index} justify='center'>
          <Card className='activityCard__container-content'>
            <CardHeader
              memberName={card.name}
              clubName={card.clubName}
              avatar={card.avatar}
              isMember={card.isMember}
            />
            <CardBody
              checkinContent={card.checkinContent}
              checkinTime={card.checkinTime}
              postPic={card.postPic}
            />
            <CardFooter
              thumbUpMembers={card.thumbUpMembers}
              maxAvatars={maxAvatars}
              thumbUpTimes={card.thumbUpTimes}
              hasReported={card.hasReported}
              hasThumbUp={card.hasThumbUp}
              hasforbiddened={card.hasforbiddened}
              handleReport={() => handleReport(card)}
              handleThumbUp={() => handleThumbUp(card)}
              isMember={card.isMember}
            />
          </Card>
        </Flex>
      )
    })

    return (
      <PullToRefresh
        className='activityCardList__container-content'
        damping={60}
        direction='down'
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        {activityCardList}
      </PullToRefresh>
    )
  }
}

export default ActivityCardList
