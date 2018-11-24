import React from 'react'
import { inject, observer } from 'mobx-react'
import { Header } from '../../components'
import ClubMember from './ClubMember'
import ClubDetail from './ClubDetail'
import BottomButton from './BottomButton'
import './detail.css'

@inject('detailStore') @observer
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.detailStore
    const { clubID } = this.props.match.params
    this.store.clubID = clubID
  }

  render() {
    const {
      isLeader,
      handleManageMember,
      handleQuitClub,
      clubID,
    } = this.store
    return (
      <div className='detail__container'>
        <Header titleName='社团详情' backRoute='/user'/>
        <div className='detail__container--content'>
          <div className='detail__container--club-info'>
            <ClubDetail/>
            <ClubMember/>
            <BottomButton
              isLeader={isLeader}
              handleManageMember={handleManageMember}
              handleQuitClub={handleQuitClub}
              clubID={clubID}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
