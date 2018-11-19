import React from "react"
import { Flex } from "antd-mobile"
import { reportIcon, thumbUpIcon } from "../svg"
import './footerExtra.css'

const FooterExtra = ({ thumbUpTimes, hasReported, hasThumbUp, hasforbiddened }) => {
  return (
    <div className='activityCard__container--extra-info'>
      {hasforbiddened ?
        <Flex justify='center'>
          <div className='activityCard__container-forbiddened'>
            {reportIcon} 被举报次数过多，已扣分
          </div>
        </Flex>
        :
        <Flex justify='center'>
          <div className={`activityCard__container-thumb-up ${hasThumbUp ? 'thumbUpActive' : ''}`}>
            {thumbUpIcon} {thumbUpTimes}
          </div>
          {hasReported ?
            <div className='activityCard__container-report'>
              {reportIcon} 已举报
            </div>
            :
            <div className='activityCard__container-report'>
              {reportIcon} 举报
            </div>
          }
        </Flex>
      }
    </div>
  )
}

export default FooterExtra
