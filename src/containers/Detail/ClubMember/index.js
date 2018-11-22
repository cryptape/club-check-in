import React from 'react'
import { inject, observer } from 'mobx-react'
import { Badge, List, } from 'antd-mobile'
import './clubMember.css'

const { Item } = List
const { Brief } = Item

@inject('clubmemberStore') @observer
class ClubMember extends React.Component {

  render () {
    const {
      memberDataList,
      checkLeader,
    } = this.props.clubmemberStore

    const memberList = memberDataList.map((data, index) => {
      return (
        <Item
          key={index}
          className='clubMember__listItem--personal-info'
          arrow="empty"
          thumb={data.avatar}
          multipleLine
        >
          {data.name}
          {checkLeader(data.address) ? <Badge text={'团长'}/> : ''}
          <Brief>
            <div>{data.address}</div>
            <div className='clubMember__listItem--personal-points'>{`社团积分: ${data.points}`}</div>
          </Brief>
        </Item>
      )
    })

    return (
      <div className='clubMember__lists--container'>
        <List>
          {memberList}
        </List>
      </div>
    )
  }
}

export default ClubMember
