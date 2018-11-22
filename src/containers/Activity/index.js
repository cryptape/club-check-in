import React from 'react'
import { inject, observer } from 'mobx-react'
import { BottomNav, Header } from '../../components'
import ActivityCardList from './ActivityCardList'
import './activity.css'

@inject('activityStore') @observer
class Activity extends React.Component {

  render () {
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
