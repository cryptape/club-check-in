import React from 'react'
import { inject, observer } from 'mobx-react'
import { BottomNav } from '../../components'
import ActivityCardList from './ActivityCardList'
import { ChangeTitle } from '../../utils'
import './activity.css'

@inject('activityStore') @observer
class Activity extends React.Component {

  constructor(props) {
    super(props)
    this.store = props.activityStore
  }

  componentDidMount() {
    ChangeTitle('社团圈', 'close')
    this.store.getActivities()
    console.log('checkInEventsToShow', this.store.checkInEventsToShow)
  }

  render() {

    console.log(this.store.checkInEventsToShow.slice())

    return (
      <div className='activity__container'>
        <div className='activity__container--content'>
          <ActivityCardList/>
          <BottomNav active={'activity'}/>
        </div>
      </div>
    )
  }
}

export default Activity
