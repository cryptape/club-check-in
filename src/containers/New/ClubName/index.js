import React from 'react'
import { InputItem } from 'antd-mobile'

const ClubName = ({ onChange }) => {
  return (
    <InputItem
      className='newClub__input--club-name'
      placeholder='取一个个性的昵称吧n(*≧▽≦*)n'
      maxLength={10}
      onChange={(val) => {
        onChange(val, 'clubName')
      }}
    >社团名称</InputItem>
  )
}

export default ClubName
