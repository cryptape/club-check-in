import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Button,
    Flex,
    List,
} from 'antd-mobile'
import './personalPanel.css'

const Item = List.Item
const Brief = Item.Brief
const thumbPic = 'avatar.png'
const joinIcon = <img src="per_join.png" alt="" />
const createIcon = <img src="per_create.png" alt="" />


@inject('personalStore') @observer
class PersonalPanel extends React.Component {

    render() {
        const {
            handleJoin,
            handleCreate,
        } = this.props.personalStore

        return (
            <div className='personal-panel'>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb={thumbPic}
                        multipleLine
                        onClick={() => {}}
                    >
                        刘看山 <Brief>0X291302034049012393Ba0414</Brief>
                    </Item>
                    <Item className='group-button'>
                        <Flex justify='between'>
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
