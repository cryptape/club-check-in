import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, } from "antd-mobile"
import { Header } from '../../components'
import ClubMember from './ClubMember'
import ClubDetail from './ClubDetail'
import './detail.css'

@inject('detailStore') @observer
class Detail extends React.Component {

  render() {

    const {
      handleManageMember,
      handleQuitClub,
      isLeader,
    } = this.props.detailStore

    return (
      <div className='detail__container--club'>
        <Header titleName='社团详情' backRoute='./personal'/>
        <div className='detail__container--club-info'>
          <ClubDetail/>
          <ClubMember/>
          {isLeader ? <Button href='#/manage' className='detail__button--club-manage' onClick={handleManageMember}>
            管理
          </Button> : <Button className='detail__button--club-manage' onClick={handleQuitClub}>
            退出
          </Button>}
        </div>
      </div>
    )
  }
}

export default Detail
