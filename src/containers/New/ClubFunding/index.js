import React from "react"
import { InputItem } from "antd-mobile"

const ClubFunding = ({ onChange }) => {
  // TODO antd mobile has bug here, type digit and maxLength doesn't work
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
