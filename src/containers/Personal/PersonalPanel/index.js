import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Button,
    Flex,
    List,
    Modal,
} from 'antd-mobile'
import './personalPanel.css'

const Item = List.Item
const Brief = Item.Brief
const prompt = Modal.prompt

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
                            <Button icon={joinIcon} onClick={() => prompt('加入新社团', '社团ID', [
                            { text: '确定', onPress: value => console.log(`输入的内容:${value}`) },
                                ], 'default', null, ['输入你想加入的社团ID吧'])}>
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
