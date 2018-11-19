import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Flex } from 'antd-mobile'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import './activityCardList.css'

@inject('activityStore') @observer
class ActivityCardList extends React.Component {

  render() {
    const {
      activityDataList,
      maxAvatars,
    } = this.props.activityStore

    const activityCardList = activityDataList.map((card, index) => {
      return (
        <Flex key={index} justify='center'>
          <Card className='activityCard__container-content'>
            <CardHeader memberName={card.name} clubName={card.clubName} avatar={card.avatar}/>
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
            />
          </Card>
        </Flex>
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
