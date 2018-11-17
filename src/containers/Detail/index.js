import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, } from "antd-mobile"
import { Header } from '../../components'
import ClubMember from './ClubMember'
import ClubDetail from './ClubDetail'
import BottomButton from './BottomButton'
import './detail.css'

@inject('detailStore') @observer
class Detail extends React.Component {

  render() {
    return (
      <div className='detail__container--club'>
        <Header titleName='社团详情' backRoute='./personal'/>
        <div className='detail__container--club-info'>
          <ClubDetail/>
          <ClubMember/>
          <BottomButton props={this.props.detailStore}/>
        </div>
      </div>
    )
  }
}

export default Detail
