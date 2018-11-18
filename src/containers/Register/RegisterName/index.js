import React from "react"
import { InputItem } from "antd-mobile"

const RegisterName = ({ onChange }) => {
  return (
    <InputItem
      className='register__input--nickName'
      placeholder="取一个n(*≧▽≦*)n昵称"
      onChange={onChange}
    >注册昵称</InputItem>
  )
}

export default RegisterName
