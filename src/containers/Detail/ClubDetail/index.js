import React from 'react'
import { inject, observer } from 'mobx-react'
import './clubDetail.css'

@inject('clubMemberStore') @observer
class ClubDetail extends React.Component {

  constructor(props) {
    super(props)
    this.store = props.clubMemberStore
  }

  componentDidMount() {
    this.store.getMemberDataList()
  }

  render() {
    const { detailPageClubInfo } = this.props.clubMemberStore

    return (
      <div className='clubDetail__container--content'>
        <div className='clubDetail__content--name'>
          {detailPageClubInfo.clubName}
        </div>
        <div className='clubDetail__container--deposit'>
          <div className='clubDetail__container--deposit-info'>
            <span className='clubDetail__content--deposit'>社团经费：{detailPageClubInfo.clubFunding}</span>
            <div className='clubDetail__content--separate-line'></div>
            <span className='clubDetail__content--id'>ID: {detailPageClubInfo.clubID}</span>
          </div>
          <div className='clubDetail__content--rule'>
            {detailPageClubInfo.clubRule}
          </div>
        </div>
      </div>
    )
  }
}

export default ClubDetail
