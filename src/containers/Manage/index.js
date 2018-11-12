import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, InputItem } from "antd-mobile"
import Header from '../../components/Header'
import ManageClubDetail from './ManageClubDetail'
import './manage.css'

@inject('manageStore') @observer
class Manage extends React.Component {

  render() {
    const {
      handleSettle,
      handleMoney,
    } = this.props.manageStore
    return (
      <div className='manageClubDetail__container--club'>
        <Header titleName='社团管理' backRoute='./detail'/>
        <div className='manageClubDetail__container--club-info'>
          <ManageClubDetail/>
          <Flex className='manageClubDetail__container--increase-money' justify='center'>
            <InputItem
              className='manageClubDetail__input--increase-money'
              placeholder="金额"
            />
            <Button className='manageClubDetail__button--increase-money' onClick={handleMoney}>
              增加经费
            </Button>
          </Flex>
        </div>
        <Button className='manageClubDetail__button--settle' onClick={handleSettle}>
          活动结算
        </Button>
      </div>
    )
  }
}

export default Manage
