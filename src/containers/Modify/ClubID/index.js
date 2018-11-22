import React from 'react'
import { InputItem } from 'antd-mobile'

const ClubID = ({ clubID }) => {
  return (
    <InputItem
      className='modifyClub__input--club-id'
      placeholder={clubID}
      disabled={true}
    >社团ID</InputItem>
  )
}

export default ClubID
