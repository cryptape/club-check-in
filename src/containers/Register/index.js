import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, } from 'antd-mobile'
import RegisterAddress from './RegisterAddress'
import RegisterAvatar from './RegisterAvatar'
import RegisterName from './RegisterName'
import ClubLogo from './ClubLogo'
import { ChangeTitle } from '../../utils'
import './register.css'

@inject('registerStore') @observer
class Register extends React.Component {

  constructor(props) {
    super(props)
    this.store = this.props.registerStore
  }

  componentDidMount() {
    ChangeTitle('用户设置', 'back')
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
      isInfoCompleted,
      ifRegistered,
      handleInput,
    } = this.store

    return (
      <div className='register__container'>
        <div className='register__container--content'>
          <RegisterAddress registerAddress={registerAddress}/>
          <RegisterName onInput={handleInput} registerName={registerName}/>
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

