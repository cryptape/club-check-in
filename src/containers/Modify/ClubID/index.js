import React from 'react'
import { InputItem } from 'antd-mobile'

const ClubID = ({ clubID }) => {
  return (
    <InputItem
      className='modifyClub__input--club-id'
      value={clubID}
      editable={false}
    >社团ID</InputItem>
  )
}

export default ClubID
