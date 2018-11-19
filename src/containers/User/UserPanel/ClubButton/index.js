import React from "react"
import { Button, Flex, List } from "antd-mobile"
import './clubButton.css'

const { Item } = List

const ClubButton = ({ joinIcon, createIcon, handleJoin }) => {
  return (
    <Item className='user__container--group-button'>
      <Flex justify='center'>
        <Button className='user__button--join-club' icon={joinIcon} onClick={handleJoin}>
          加入社团
        </Button>
        <Button icon={createIcon} href={'#/new'}>
          创建社团
        </Button>
      </Flex>
    </Item>
  )
}

export default ClubButton
