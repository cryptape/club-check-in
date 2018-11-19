import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from "antd-mobile"
import { Header } from '../../components'
import ClubID from './ClubID'
import ClubName from './ClubName'
import ClubRule from './ClubRule'
import ReportThreshold from './ReportThreshold'
import './modify.css'

@inject('modifyStore') @observer
class Modify extends React.Component {

  render() {

    const {
      handleConfirmModify,
      clubInfo,
    } = this.props.modifyStore

    return (
      <div className='modifyClub__container'>
        <Header titleName='社团信息修改' backRoute='./detail'/>
        <div className='modifyClub__container--content'>
          <ClubName clubName={clubInfo.clubName}/>
          <ClubID clubID={clubInfo.clubID}/>
          <ClubRule clubRule={clubInfo.clubRule}/>
          <ReportThreshold reportThreshold={clubInfo.reportThreshold}/>
          <Button className='modifyClub__button--confirm-modify' onClick={handleConfirmModify}>
            确认修改
          </Button>
        </div>
      </div>
    )
  }
}

export default Modify
