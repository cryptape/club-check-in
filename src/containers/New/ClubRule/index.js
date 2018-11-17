import React from "react"
import { Flex, TextareaItem } from "antd-mobile"
import './clubRule.css'

const ClubRule = () => {
  return (
    <div>
      <div className='newClub__content--club-rule-title'>
        社团规则
      </div>
      <Flex justify='center'>
        <TextareaItem
          className='newClub__content--club-rule'
          placeholder='有什么要嘱咐团员的都写在这里吧'
          rows={8}
          count={180}
        />
      </Flex>
    </div>
  )
}

export default ClubRule
