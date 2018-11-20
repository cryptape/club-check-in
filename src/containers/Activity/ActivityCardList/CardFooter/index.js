import React from "react"
import { Card, } from "antd-mobile"
import FooterExtra from './FooterExtra'
import './cardFooter.css'

const CardFooter = ({ thumbUpMembers, maxAvatars, thumbUpTimes, hasReported, hasThumbUp, hasforbiddened, handleReport, handleThumbUp }) => {

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
          thumbUpTimes={thumbUpTimes}
          hasReported={hasReported}
          hasforbiddened={hasforbiddened}
          hasThumbUp={hasThumbUp}
          handleReport={handleReport}
          handleThumbUp={handleThumbUp}
        />
      }
    />
  )
}

export default CardFooter
