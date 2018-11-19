import React from "react"
import { Card, } from "antd-mobile"
import FooterExtra from './FooterExtra'
import './cardFooter.css'

const CardFooter = ({ thumbUpMembers, maxAvatars, thumbUpTimes, hasReported, hasThumbUp, hasforbiddened }) => {

  return (
    <Card.Footer
      content={
        <ul className='activityCard__container--club-thumbup-member'>
          {thumbUpMembers.map((avatar, index) => {
            if (index <= maxAvatars) {
              return <li key={index}><img src={avatar} alt=""/></li>
            }
          })}
        </ul>
      }
      extra={
        <FooterExtra
          thumbsUpTimes={thumbUpTimes}
          hasReported={hasReported}
          hasforbiddened={hasforbiddened}
          hasThumbUp={hasThumbUp}
        />
      }
    />
  )
}

export default CardFooter
