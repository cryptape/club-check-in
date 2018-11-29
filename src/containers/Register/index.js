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
    this.store.history = this.props.history
  }

  componentDidMount() {
    console.log('this.store.history in register111', this.store.history)
    this.store.checkIfRegistered()
  }

  handleSubmitConfirm = () => {
    console.log('this.store.history in register', this.store.history)
    this.store.handleSubmit(this.store.history)
  }

  render() {
    const {
      files,
      registerAddress,
      registerName,
      onRegisterAvatarChange,
      isInfoCompleted,
      handleInput,
    } = this.store

    return (
      <div className='register__container'>
        <Header titleName='用户设置' backRoute='/user'/>
        <div className='register__container--content'>
          <RegisterAddress registerAddress={registerAddress}/>
          <RegisterName
            onInput={handleInput}
            registerName={registerName}
          />
          <RegisterAvatar files={files} onChange={onRegisterAvatarChange}/>
          <ClubLogo/>
          <Button
            disabled={!isInfoCompleted}
            className={`register__button--finish ${!isInfoCompleted ? 'inactive' : ''}`} onClick={this.handleSubmitConfirm}>
            完成
          </Button>
        </div>
      </div>
    )
  }
}

export default Register

