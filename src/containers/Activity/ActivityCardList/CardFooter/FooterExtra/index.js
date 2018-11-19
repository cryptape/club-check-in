import React from "react"
import { Flex } from "antd-mobile"
import { reportIcon, thumbUpIcon } from "../svg"
import './footerExtra.css'

const FooterExtra = ({ thumbsUpTimes, hasReported, hasforbiddened }) => {
  return (
    <div className='activityCard__container--extra-info'>
      {hasforbiddened ?
        <Flex justify='center'>
          <div className='activityCard__container-forbiddened'>
            {reportIcon} 被举报次数过多，以扣分
          </div>
        </Flex>
        :
        <Flex justify='center'>
          <div className='activityCard__container-thumb-up'>
            {thumbUpIcon} {thumbsUpTimes}
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
