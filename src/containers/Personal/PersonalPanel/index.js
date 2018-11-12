import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Button,
    Flex,
    List,
} from 'antd-mobile'
import { Link } from "react-router-dom"
import './personalPanel.css'

const { Item } = List
const { Brief } = Item

@inject('personalStore') @observer
class PersonalPanel extends React.Component {

    render() {
        const {
            handleJoin,
            handleCreate,
            thumbPic,
            joinIcon,
            createIcon,
        } = this.props.personalStore

        return (
            <div className='personal__container--user-info'>
                <List>
                    <Link to={'/register'}>
                        <Item
                            arrow="horizontal"
                            thumb={thumbPic}
                            multipleLine
                        >
                            realwwy <Brief>0X291302034049012393Ba0414</Brief>
                        </Item>
                    </Link>
                    <Item className='personal__container--group-button'>
                        <Flex justify='center'>
                            <Button icon={joinIcon} onClick={handleJoin}>
                                加入社团
                            </Button>
                            <Button icon={createIcon} onClick={handleCreate}>
                                创建社团
                            </Button>
                        </Flex>
                    </Item>
                </List>
            </div>
        )
    }
}

export default PersonalPanel
