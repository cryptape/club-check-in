import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, InputItem, TextareaItem } from "antd-mobile"
import Header from "../../components/Header"
import './modify.css'

@inject('modifyStore') @observer
class Modify extends React.Component {

  render() {

    const {
      handleConfirmModify,
      clubRule,
    } = this.props.modifyStore

    return (
      <div className='modifyClub__container--content'>
        <Header titleName='社团信息修改' backRoute='./detail'/>
        <InputItem
          className='modifyClub__input--club-name'
          placeholder='Cryptape慢跑俱乐部'
        >社团名称</InputItem>
        <InputItem
          className='modifyClub__input--club-id'
          placeholder="1001"
        >社团ID</InputItem>
        <div className='modifyClub__content--club-rule-title'>
          社团规则
        </div>
        <Flex justify='center'>
          <TextareaItem
            className='modifyClub__content--club-rule'
            defaultValue={clubRule}
            rows={8}
            count={180}
          />
        </Flex>
        <InputItem
          className='modifyClub__input--report-threshold'
          defaultValue={3}
        >举报阈值</InputItem>
        <Button className='modifyClub__button--confirm-modify' onClick={handleConfirmModify}>
          确认修改
        </Button>
      </div>
    )
  }
}

export default Modify
