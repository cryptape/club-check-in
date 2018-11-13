import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, ImagePicker, InputItem, } from 'antd-mobile'
import { Header } from '../../components'
import './register.css'

@inject('registerStore') @observer
class Register extends React.Component {
  //TODO should disabled confirm button when there is no nickname or avatar
  render() {
    const {
      files,
      onChange,
      handleRegister,
    } = this.props.registerStore

    return (
      <div className='register__container--content'>
        <Header
          titleName='用户设置'
          backRoute='/personal'
        />
        <InputItem
          placeholder="0X291302034049012393Ba0414"
        >注册账号</InputItem>
        <InputItem
          className='register__input--nickName'
          placeholder="取一个n(*≧▽≦*)n昵称"
        >注册昵称</InputItem>
        <div className='register__content--avatar-title'>
          选择头像
        </div>
        <Flex.Item>
          <div className='register__img--avatar'>
            <ImagePicker
              files={files}
              length={2}
              onChange={onChange}
              selectable={files.length === 0}
            />
          </div>
        </Flex.Item>
        <Flex justify='center'>
          <img className='register__img--club-logo' src="club-logo.png" alt=""/>
        </Flex>
        <Button className='register__button--finish' onClick={handleRegister}>
          完成
        </Button>
      </div>
    )
  }
}

export default Register

