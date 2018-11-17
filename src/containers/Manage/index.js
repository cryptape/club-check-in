import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from "antd-mobile"
import { Header } from '../../components'
import ManageClubDetail from './ManageClubDetail'
import IncreaseFunding from './IncreaseFunding'
import './manage.css'

@inject('manageStore') @observer
class Manage extends React.Component {

  render() {
    const {
      handleSettle,
      handleMoney,
    } = this.props.manageStore
    return (
      <div className='manageClubDetail__container--content'>
        <Header titleName='社团管理' backRoute='./detail'/>
        <ManageClubDetail/>
        <IncreaseFunding handleMoney={handleMoney}/>
        <Button className='manageClubDetail__button--settle' onClick={handleSettle}>
          活动结算
        </Button>
      </div>
    )
  }
}

export default Manage
