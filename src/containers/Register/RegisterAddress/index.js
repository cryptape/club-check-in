import React from 'react'
import { InputItem } from 'antd-mobile'

const RegisterAddress = ({ registerAddress }) => {
  return (
    <InputItem
      editable={false}
      value={registerAddress}
    >注册账号</InputItem>
  )
}

export default RegisterAddress
