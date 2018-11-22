import React from 'react'
import { Card } from 'antd-mobile'
import './cardHeader.css'

const CardHeader = ({ memberName, clubName, avatar }) => {

  return (
    <Card.Header
      title={
        <div>
          <div className='activityCard__content-member-name'>
            {memberName}
          </div>
          <div className='activityCard__content-club-name'>
            {clubName}
          </div>
        </div>
      }
      thumb={avatar}
    />
  )
}

export default CardHeader
