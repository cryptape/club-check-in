import React from 'react'
import { InputItem } from 'antd-mobile'

const RegisterAddress = ({ registerAddress }) => {
  return (
    <InputItem
      defaultValue={registerAddress}
      disabled={true}
    >注册账号</InputItem>
  )
}

export default RegisterAddress
