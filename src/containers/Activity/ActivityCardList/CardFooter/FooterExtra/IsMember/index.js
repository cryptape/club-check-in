import React from 'react'
import { Flex } from 'antd-mobile'
import { reportIcon, thumbUpIcon } from '../svg'

const IsMember = ({
                    thumbUpTimes,
                    hasReported,
                    hasThumbUp,
                    hasforbiddened,
                    handleReport,
                    handleThumbUp,
                  }) => {
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
          <div
            className={`activityCard__container-thumb-up ${hasThumbUp ? 'thumbUpActive' : ''}`}
            onClick={hasThumbUp ? () => console.log('already thumb up') : handleThumbUp}
          >
            {thumbUpIcon} {thumbUpTimes}
          </div>
          {hasReported ?
            <div className='activityCard__container-report'>
              {reportIcon} 已举报
            </div>
            :
            <div className='activityCard__container-report' onClick={handleReport}>
              {reportIcon} 举报
            </div>
          }
        </Flex>
      }
    </div>
  )
}

export default IsMember
