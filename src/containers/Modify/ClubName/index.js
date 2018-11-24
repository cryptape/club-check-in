import React from 'react'
import { InputItem } from 'antd-mobile'

const ClubName = ({ clubName }) => {
  return (
    <InputItem
      className='modifyClub__input--club-name'
      value={clubName}
      editable={false}
    >社团名称</InputItem>
  )
}

export default ClubName
