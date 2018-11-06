import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Button,
    Flex,
    InputItem,
    ImagePicker,
    WhiteSpace,
} from 'antd-mobile'
import {Header, Footer} from '../../components'
import './home.css'

@inject('personalStore') @observer
class Home extends React.Component {

    render() {
        return (
            <div className='home-container'>
                <Flex>
                    <Flex.Item>
                        <Header titleName='社团圈'/>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>
                        <Footer/>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}

export default Home
