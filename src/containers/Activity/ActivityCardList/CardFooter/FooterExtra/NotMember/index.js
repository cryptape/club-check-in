import React from 'react'
import { Flex } from 'antd-mobile'
import { reportIcon, thumbUpIcon } from '../svg'

const NotMember = ({
                    thumbUpTimes,
                    hasThumbUp,
                    hasforbiddened,
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
            onClick={handleThumbUp}
          >
            {thumbUpIcon} {thumbUpTimes}
          </div>
        </Flex>
      }
    </div>
  )
}

export default NotMember
