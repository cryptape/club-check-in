import React from "react"
import { Flex, TextareaItem } from "antd-mobile"
import './clubRule.css'

const ClubRule = ({ clubRule }) => {
  return (
    <div>
      <div className='modifyClub__content--club-rule-title'>
        社团规则
      </div>
      <Flex justify='center'>
        <TextareaItem
          className='modifyClub__content--club-rule'
          defaultValue={clubRule}
          rows={8}
          count={180}
        />
      </Flex>
    </div>
  )
}

export default ClubRule