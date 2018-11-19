import React from "react"
import { InputItem } from "antd-mobile"

const ClubFunding = ({ onChange }) => {
  // TODO type is digit has bug in mobile phone
  // TODO can add onErrorClick tips here by using antd mobile
  return (
    <InputItem
      className='newClub__input--club-funding'
      placeholder='写了你就别后悔'
      type='digit'
      maxLength={5}
      onChange={(val) => {
        onChange(val, 'clubFunding')
      }}
    >社团经费</InputItem>
  )
}

export default ClubFunding
