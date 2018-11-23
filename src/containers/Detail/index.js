import React from 'react'
import { inject, observer } from 'mobx-react'
import { Header } from '../../components'
import ClubMember from './ClubMember'
import ClubDetail from './ClubDetail'
import BottomButton from './BottomButton'
import './detail.css'

@inject('detailStore', 'clubListStore') @observer
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.detailStore
  }

  componentDidMount() {
    const {clubID} = this.props.match.params
    console.log('clubID in detail page', clubID)
  }

  render() {
    const {
      isLeader,
      handleManageMember,
      handleQuitClub,
    } = this.state

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
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
