import React from "react"
import { Card } from "antd-mobile"
import { reportIcon, thumbUpIcon } from './svg'
import './cardFooter.css'

const CardFooter = ({ thumbsUpMembers, maxAvatars }) => {

  return (
    <Card.Footer
      content={
        <ul className='activityCard__container--club-thumbup-member'>
          {thumbsUpMembers.map((avatar, index) => {
            if (index <= maxAvatars) {
              return <li key={index}><img src={avatar} alt=""/></li>
            }
          })}
        </ul>
      }
      extra={
        <div>
          {reportIcon}
          {thumbUpIcon}
        </div>
        }
    />
  )
}

export default CardFooter
