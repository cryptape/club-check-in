import React from 'react'
import { inject, observer } from 'mobx-react'
import { Badge, List, } from 'antd-mobile'
import './clubMember.css'

const { Item } = List
const { Brief } = Item

@inject('clubMemberStore') @observer
class ClubMember extends React.Component {

  render() {
    const {
      memberDataList,
      checkLeader,
    } = this.props.clubMemberStore

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
            <div className='clubMember__listItem--personal-points'>
              {`社团积分: ${data.points}`}
              <span className='clubMember__listItem--personal-bonus'>预计奖励：{data.bonus ? data.bonus : '--'} CCT</span>
            </div>
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
