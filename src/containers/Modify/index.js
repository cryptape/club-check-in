import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import { Header } from '../../components'
import ClubID from './ClubID'
import ClubName from './ClubName'
import ClubRule from './ClubRule'
import ReportThreshold from './ReportThreshold'
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
    const title = { title: { name: '社团信息修改', }, left: { type: "back" }, }
    window.webTitleBar.getTitleBar(JSON.stringify(title))
    this.store.clearPageInfo()
  }

  render() {

    const {
      handleConfirmModify,
      clubInfo,
      onInfoChange,
      hasContentChange,
      clubID,
      newClubRule,
      newReportThreshold,
    } = this.store

    return (
      <div className='modifyClub__container'>
        {/* <Header titleName='社团信息修改' backRoute={`/detail/${clubID}`}/> */}
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
