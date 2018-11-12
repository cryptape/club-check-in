import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, InputItem, TextareaItem, } from "antd-mobile"
import Header from "../../components/Header"
import './new.css'

@inject('newStore') @observer
class New extends React.Component {

  render() {

    const { handleCreateClub } = this.props.newStore

    return (
      <div className='newClub__container--content'>
        <Header titleName='创建社团' backRoute='./personal'/>
        <InputItem
          className='newClub__input--club-name'
          placeholder='取一个个性的昵称吧n(*≧▽≦*)n'
        >社团名称</InputItem>
        <div className='newClub__content--club-rule-title'>
          社团规则
        </div>
        <Flex justify='center'>
          <TextareaItem
            className='newClub__content--club-rule'
            placeholder='有什么要嘱咐团员的都写在这里吧'
            rows={8}
            count={180}
          />
        </Flex>
        <InputItem
          className='newClub__input--club-deposit'
          placeholder="写了你就别后悔"
        >社团经费</InputItem>
        <InputItem
          className='newClub__input--report-threshold'
          placeholder="看你心情咯"
        >举报阈值</InputItem>
        <Button className='newClub__button--create-club' onClick={handleCreateClub}>
          创建社团
        </Button>
      </div>
    )
  }
}

export default New
