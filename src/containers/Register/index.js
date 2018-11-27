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

  constructor(props) {
    super(props)
    this.store = this.props.registerStore
  }

  componentDidMount() {
    this.store.checkIfRegistered()
  }

  handleConfirmSubmit = () => {
    this.store.handleSubmit(this.props.history)
  }

  render() {
    const {
      files,
      registerAddress,
      registerName,
      onRegisterAvatarChange,
      onRegisterAddressChange,
      isInfoCompleted,
      ifRegistered,
    } = this.store

    return (
      <div className='register__container'>
        <Header titleName='用户设置' backRoute='/user'/>
        <div className='register__container--content'>
          <RegisterAddress registerAddress={registerAddress}/>
          <RegisterName onChange={onRegisterAddressChange} registerName={registerName}/>
          <RegisterAvatar files={files} onChange={onRegisterAvatarChange}/>
          <ClubLogo/>
          <Button
            disabled={!isInfoCompleted}
            className={`register__button--finish ${!isInfoCompleted ? 'inactive' : ''}`} onClick={this.handleConfirmSubmit}>
            {ifRegistered ? '更新' : '注册'}
          </Button>
        </div>
      </div>
    )
  }
}

export default Register

