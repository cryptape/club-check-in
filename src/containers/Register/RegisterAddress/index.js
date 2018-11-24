import React from 'react'
import { InputItem } from 'antd-mobile'

const RegisterAddress = ({ registerAddress }) => {
  return (
    <InputItem
      disabled={true}
      value={registerAddress}
    >注册账号</InputItem>
  )
}

export default RegisterAddress
