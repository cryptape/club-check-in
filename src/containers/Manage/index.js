import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import ManageClubDetail from './ManageClubDetail'
import IncreaseFunding from './IncreaseFunding'
import './manage.css'
import { ChangeTitle } from '../../utils'

@inject('manageStore') @observer
class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.manageStore
    const { clubID } = this.props.match.params
    this.store.clubID = clubID
    this.store.history = this.props.history
  }

  componentDidMount() {
    ChangeTitle('社团管理', 'back')
    this.store.clearPageInfo()
  }

  render() {
    const {
      handleSettle,
      hasInputFunding,
      handleInput,
      handleFunding,
      clubID,
      enableClear,
      history,
    } = this.store

    return (
      <div className='manageClubDetail__container'>
        <div className='manageClubDetail__container--content'>
          <ManageClubDetail clubID={clubID}/>
          <IncreaseFunding
            hasInputFunding={hasInputFunding}
            handleFunding={handleFunding}
            onInput={handleInput}
            history={history}
          />
          <Button 
            disabled={!enableClear}
            className='manageClubDetail__button--settle' onClick={handleSettle}>
            活动结算
          </Button>
        </div>
      </div>
    )
  }
}

export default Manage
