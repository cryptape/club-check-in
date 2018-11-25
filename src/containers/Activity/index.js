import React from 'react'
import { inject, observer } from 'mobx-react'
import { BottomNav, Header } from '../../components'
import ActivityCardList from './ActivityCardList'
import './activity.css'

@inject('activityStore') @observer
class Activity extends React.Component {

  constructor(props) {
    super(props)
    this.store = props.activityStore
  }

  componentDidMount() {
    this.store.getActivities()
    console.log('checkInEventsToShow', this.store.checkInEventsToShow)
  }

  render() {

    console.log(this.store.checkInEventsToShow.slice())

    return (
      <div className='activity__container'>
        <Header titleName='社团圈'/>
        <div className='activity__container--content'>
          <ActivityCardList/>
          <BottomNav active={'activity'}/>
        </div>
      </div>
    )
  }
}

export default Activity
