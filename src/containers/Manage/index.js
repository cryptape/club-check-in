import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import { Header } from '../../components'
import ManageClubDetail from './ManageClubDetail'
import IncreaseFunding from './IncreaseFunding'
import './manage.css'

@inject('manageStore') @observer
class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.manageStore
    const { clubID } = this.props.match.params
    this.store.clubID = clubID
  }

  render() {
    const {
      handleSettle,
      handleIncreaseChange,
      hasInputFunding,
      handleFunding,
      clubID
    } = this.store

    return (
      <div className='manageClubDetail__container'>
        <Header titleName='社团管理' backRoute={`/detail/${clubID}`}/>
        <div className='manageClubDetail__container--content'>
          <ManageClubDetail clubID={clubID}/>
          <IncreaseFunding
            handleIncreaseChange={handleIncreaseChange}
            hasInputFunding={hasInputFunding}
            handleFunding={handleFunding}
          />
          <Button className='manageClubDetail__button--settle' onClick={handleSettle}>
            活动结算
          </Button>
        </div>
      </div>
    )
  }
}

export default Manage
