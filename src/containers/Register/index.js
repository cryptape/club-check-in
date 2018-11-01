import React from 'react'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import {
    Button,
    Flex,
    InputItem,
    ImagePicker,
    WhiteSpace,
} from 'antd-mobile'
import './register.css'

@inject('registerStore') @observer
class Register extends React.Component {

    render() {
        const {
            files,
            onChange,
            handleRegister,
        } = this.props.registerStore

        return (
            <div className='register-container'>
                <Flex>
                    <Flex.Item>
                        <Header titleName='用户设置'/>
                    </Flex.Item>
                </Flex>
                <Flex className='register-title' justify='center'>
                    秘猿科技社团 DApp
                </Flex>
                <Flex justify='center'>
                    <InputItem
                        defaultValue='个人钱包地址'
                        disabled={true}
                    >注册账号</InputItem>
                </Flex>
                <WhiteSpace size='lg'/>
                <Flex justify='center'>
                    <InputItem
                        placeholder="请输入注册昵称"
                    >注册昵称</InputItem>
                </Flex>
                <Flex className='register-img-title' justify='center'>
                    选择头像
                </Flex>
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
                <WhiteSpace size='lg'/>
                <Flex justify='center'>
                    <Button inline type={"primary"} onClick={handleRegister}>完成</Button>
                </Flex>
            </div>
        )
    }
}

export default Register

