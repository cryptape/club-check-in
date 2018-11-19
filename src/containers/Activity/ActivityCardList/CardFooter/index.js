import React from "react"
import { Card } from "antd-mobile"
import './cardFooter.css'

const CardFooter = ({ thumbsUpMembers, maxAvatars }) => {

  return (
    <Card.Footer
      content={
        <ul className='activityCard__container--club-item'>
          {thumbsUpMembers.map((avatar, index) => {
            if (index <= maxAvatars) {
              return <li key={index}><img src={avatar} alt=""/></li>
            }
          })}
        </ul>
      }
      extra={
        <div>
          {/*<img src={'report_highlight.png'} alt=""/>*/}
          <div>被举报次数过多，已扣分</div>
        </div>}
    />
  )
}

export default CardFooter
