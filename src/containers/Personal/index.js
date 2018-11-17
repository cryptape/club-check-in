import React from 'react'
import { inject, observer } from 'mobx-react'
import { Header } from '../../components'
import PersonalPanel from './PersonalPanel'
import ClubListItem from './ClubListItem'
import BottomNav from '../../components/BottomNav'
import './personal.css'

@inject('personalStore') @observer
class Personal extends React.Component {

  render() {
    return (
      <div className='personal__container--content'>
        <Header titleName='个人'/>
        <PersonalPanel/>
        <ClubListItem/>
        <BottomNav active={'personal'}/>
      </div>
    )
  }
}

export default Personal
