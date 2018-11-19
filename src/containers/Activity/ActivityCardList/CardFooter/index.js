import React from "react"
import { Card, } from "antd-mobile"
import FooterExtra from './FooterExtra'
import './cardFooter.css'

const CardFooter = ({ thumbsUpMembers, maxAvatars, thumbsUpTimes, hasReported, hasforbiddened }) => {

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
        <FooterExtra
          thumbsUpTimes={thumbsUpTimes}
          hasReported={hasReported}
          hasforbiddened={hasforbiddened}
        />
      }
    />
  )
}

export default CardFooter
