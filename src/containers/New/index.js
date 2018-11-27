import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import ClubName from './ClubName'
import ClubRule from './ClubRule'
import ReportThreshold from './ReportThreshold'
import { ChangeTitle } from '../../utils'
import './new.css'

@inject('newStore') @observer
class New extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.newStore
  }

  componentDidMount() {
    ChangeTitle('创建社团', "back")
    this.store.clearPageInfo()
  }

  handleCreate = () => {
    this.store.handleCreateClub(this.props.history)
  }

  render() {

    const {
      isInfoCompleted,
      onInfoChange,
    } = this.store

    return (
      <div className='newClub__container'>
        <div className='newClub__container--content'>
          <ClubName onChange={onInfoChange}/>
          <ClubRule onChange={onInfoChange}/>
          <ReportThreshold onChange={onInfoChange}/>
          <Button
            disabled={!isInfoCompleted}
            className={`newClub__button--create-club ${!isInfoCompleted ? 'inactive' : ''}`}
            onClick={this.handleCreate}>
            创建社团
          </Button>
        </div>
      </div>
    )
  }
}

export default New

