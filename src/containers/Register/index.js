import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, } from 'antd-mobile'
import { Header } from '../../components'
import RegisterAddress from './RegisterAddress'
import RegisterAvatar from './RegisterAvatar'
import RegisterName from './RegisterName'
import ClubLogo from './ClubLogo'
import './register.css'

@inject('registerStore') @observer
class Register extends React.Component {
  // TODO should disabled confirm button when there is no nickname or avatar
  // TODO how to detect both nickname and avatar filled
  render() {
    const {
      files,
      registerAddress,
      onChange,
      handleRegister,
      isInfoCompleted,
    } = this.props.registerStore

    return (
      <div className='register__container--content'>
        <Header titleName='用户设置' backRoute='/personal'/>
        <RegisterAddress registerAddress={registerAddress}/>
        <RegisterName/>
        <RegisterAvatar files={files} onChange={onChange}/>
        <ClubLogo/>
        <Button disabled={!isInfoCompleted} className='register__button--finish' onClick={handleRegister}>
          完成
        </Button>
      </div>
    )
  }
}

export default Register

