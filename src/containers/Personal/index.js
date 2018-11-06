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
import PersonalPanel from './PersonalPanel'
import BottomNav from './BottomNav'
import './personal.css'

@inject('personalStore') @observer
class Personal extends React.Component {

    render() {
        return (
            <div className='personal-container'>
                <Flex>
                    <Flex.Item>
                        <Header titleName='个人'/>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <PersonalPanel/>
                    </Flex.Item>
                </Flex>
                <BottomNav/>
            </div>
        )
    }
}

export default Personal
