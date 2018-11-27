import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import ClubID from './ClubID'
import ClubName from './ClubName'
import ClubRule from './ClubRule'
import ReportThreshold from './ReportThreshold'
import { ChangeTitle } from '../../utils'
import './modify.css'

@inject('modifyStore') @observer
class Modify extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.modifyStore
    const { clubID } = this.props.match.params
    this.store.clubID = clubID
  }

  componentDidMount() {
    ChangeTitle('社团信息修改', "back")
    this.store.clearPageInfo()
  }

  render() {

    const {
      handleConfirmModify,
      clubInfo,
      onInfoChange,
      hasContentChange,
      newClubRule,
      newReportThreshold,
    } = this.store

    return (
      <div className='modifyClub__container'>
        <div className='modifyClub__container--content'>
          <ClubName clubName={clubInfo.clubName}/>
          <ClubID clubID={clubInfo.clubID}/>
          <ClubRule onChange={onInfoChange} newClubRule={newClubRule}/>
          <ReportThreshold onChange={onInfoChange} newReportThreshold={newReportThreshold}/>
          <Button
            disabled={!hasContentChange}
            className={`modifyClub__button--confirm-modify ${!hasContentChange ? 'inactive' : ''}`}
            onClick={handleConfirmModify}
          >
            确认修改
          </Button>
        </div>
      </div>
    )
  }
}

export default Modify
