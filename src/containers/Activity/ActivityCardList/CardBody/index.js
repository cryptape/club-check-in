import React from "react"
import { Card, Flex } from "antd-mobile"
import './cardBody.css'

const CardBody = ({ checkinContent, checkinTime }) => {

  return (
    <Card.Body>
      <Flex justify='center'>
        <div className='activityCard__container-checkin-content'>
          <div className='activityCard__content-checkin-content'>
            {checkinContent}
          </div>
          <div className='activityCard__content-checkin-time'>
            {checkinTime}
          </div>
        </div>
      </Flex>
    </Card.Body>
  )
}

export default CardBody
