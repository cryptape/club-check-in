import React from 'react'
import { InputItem } from 'antd-mobile'

const RegisterName = ({ onInput, registerName }) => {
  return (
    <InputItem
      className='register__input--nickName'
      placeholder="取一个n(*≧▽≦*)n昵称"
      value={registerName}
      onInput={onInput}
      maxLength={10}
    >注册昵称</InputItem>
  )
}

export default RegisterName
