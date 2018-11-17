import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, List, } from 'antd-mobile'
import { Link } from "react-router-dom"
import './personalPanel.css'

const { Item } = List
const { Brief } = Item

@inject('personalStore') @observer
class PersonalPanel extends React.Component {

  render() {
    const {
      handleJoin,
      thumbPic,
      joinIcon,
      createIcon,
    } = this.props.personalStore

    return (
      <Flex>
        <Flex.Item>
          <div className='personal__container--user-info'>
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
                <Button className='personal__button--join-club' icon={joinIcon} onClick={handleJoin}>
                  加入社团
                </Button>
                <Button icon={createIcon} href={'#/new'}>
                  创建社团
                </Button>
              </Flex>
            </Item>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default PersonalPanel
