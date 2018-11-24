import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import { Header } from '../../components'
import ClubName from './ClubName'
import ClubRule from './ClubRule'
import ReportThreshold from './ReportThreshold'
import './new.css'

@inject('newStore') @observer
class New extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.newStore
  }

  handleCreate = () => {
    this.state.handleCreateClub(this.props.history)
    // console.log('history1', this.props.history)
  }

  render() {

    const {
      isInfoCompleted,
      onInfoChange,
    } = this.state

    return (
      <div className='newClub__container'>
        <Header titleName='创建社团' backRoute='./user'/>
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

