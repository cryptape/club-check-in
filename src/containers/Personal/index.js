import React from 'react'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import {
    Flex,
} from 'antd-mobile'
import PersonalPanel from './PersonalPanel'
import ClubListItem from './ClubListItem'
import BottomNav from '../../components/BottomNav'
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
                <Flex>
                    <div className='personal-panel-club-banner'>已加入社团</div>
                </Flex>
                <ClubListItem/>
                {/*<Flex>*/}
                {/*<Flex.Item>*/}
                {/*<PersonalPanel/>*/}
                {/*</Flex.Item>*/}
                {/*</Flex>*/}
                <BottomNav/>
            </div>
        )
    }
}

export default Personal
