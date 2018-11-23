import React from 'react'
import { Card } from 'antd-mobile'
import {star} from './svg'
import './cardHeader.css'

const CardHeader = ({ memberName, clubName, avatar, isMember }) => {

  return (
    <Card.Header
      title={
          <div className='activityCard__container-header'>
            <div className='activityCard__content-member-name'>
              {memberName}
            </div>
            <div className='activityCard__content-club-name'>
              {clubName}
            </div>
          </div>
      }
      thumb={avatar}
      extra={isMember ? star : ''}
    />
  )
}

export default CardHeader
