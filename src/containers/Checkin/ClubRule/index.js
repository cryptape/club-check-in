import React from "react"
import { Flex, TextareaItem } from "antd-mobile"
import './clubRule.css'

const ClubRule = () => {
  return (
    <div>
      <div className='checkin__content--word'>
        打卡文字
      </div>
      <Flex justify='center'>
        <TextareaItem
          className='checkin__content--club-rule'
          rows={5}
          count={180}
        />
      </Flex>
    </div>
  )
}

export default ClubRule
