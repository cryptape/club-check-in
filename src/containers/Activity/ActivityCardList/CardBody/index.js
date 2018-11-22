import React from 'react'
import { Card, Flex } from 'antd-mobile'
import './cardBody.css'

const CardBody = ({ checkinContent, checkinTime, postPic }) => {

  return (
    <Card.Body>
      <Flex>
        <div className='activityCard__container-checkin-content'>
          {checkinContent ? <div className='activityCard__content-checkin-content'>
            {checkinContent}
          </div> : ''}
          {postPic ? <img className='activityCard__content-post-pic' src={postPic} alt=""/> : ''}
          <div className='activityCard__content-checkin-time'>
            {checkinTime}
          </div>
        </div>
      </Flex>
    </Card.Body>
  )
}

export default CardBody
