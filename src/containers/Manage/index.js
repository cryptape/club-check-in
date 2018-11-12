import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, InputItem } from "antd-mobile"
import Header from '../../components/Header'
import ManageClubDetail from './ManageClubDetail'
import './manage.css'

@inject('manageStore') @observer
class Manage extends React.Component {

  render() {

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
            <Button className='manageClubDetail__button--increase-money'>
              增加经费
            </Button>
          </Flex>
        </div>
        <Button className='manageClubDetail__button--manage'>
          活动结算
        </Button>
      </div>
    )
  }
}

export default Manage
