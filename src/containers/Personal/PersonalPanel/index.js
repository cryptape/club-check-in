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

@inject('personalStore') @observer
class PersonalPanel extends React.Component {

    render() {
        const {
            handleJoin,
            handleCreate,
            handleConfig,
            thumbPic,
            joinIcon,
            createIcon,
        } = this.props.personalStore

        return (
            <div className='personal-panel'>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb={thumbPic}
                        multipleLine
                        onClick={handleConfig}
                    >
                        realwwy <Brief>0X291302034049012393Ba0414</Brief>
                    </Item>
                    <Item className='group-button'>
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
