import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, } from "antd-mobile"
import { Header } from '../../components'
import ClubName from './ClubName'
import ClubRule from './ClubRule'
import ClubFunding from './ClubFunding'
import ReportThreshold from './ReportThreshold'
import './new.css'

@inject('newStore') @observer
class New extends React.Component {

  render() {

    const { handleCreateClub } = this.props.newStore

    return (
      <div className='newClub__container--content'>
        <Header titleName='创建社团' backRoute='./personal'/>
        <ClubName/>
        <ClubRule/>
        <ClubFunding/>
        <ReportThreshold/>
        <Button className='newClub__button--create-club' onClick={handleCreateClub}>
          创建社团
        </Button>
      </div>
    )
  }
}

export default New
