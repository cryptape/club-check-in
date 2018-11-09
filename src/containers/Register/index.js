import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Button,
    Flex,
    InputItem,
    List,
    ImagePicker,
} from 'antd-mobile'
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
            <div className='register-container'>
                <Header
                    titleName='用户设置'
                    backRoute='/personal'
                />
                <List>
                    <InputItem
                        placeholder="0X291302034049012393Ba0414"
                    >注册账号</InputItem>
                    <InputItem
                        className='input-register-nickname'
                        placeholder="取一个n(*≧▽≦*)n昵称"
                    >注册昵称</InputItem>
                </List>
                <div className='register-avatar-title'>
                    选择头像
                </div>
                <Flex>
                    <Flex.Item>
                        <div className='register-img'>
                            <ImagePicker
                                files={files}
                                length={2}
                                onChange={onChange}
                                selectable={files.length === 0}
                            />
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex justify='center'>
                    <img className='club-logo' src="club-logo.png" alt=""/>
                </Flex>
                <Button className='btn-register-join' onClick={handleRegister}>
                    完成
                </Button>
            </div>
        )
    }
}

export default Register

