import React from 'react'
import { inject, observer } from 'mobx-react'
import { BottomNav, Header } from '../../components'
import UserPanel from './UserPanel'
import ClubListItem from './ClubListItem'
import './user.css'

@inject('userStore') @observer
class User extends React.Component {

  render() {
    return (
      <div className='user__container'>
        <Header titleName='个人'/>
        <div className='user__container--content'>
          <UserPanel/>
          <ClubListItem/>
          <BottomNav active={'user'}/>
        </div>
      </div>
    )
  }
}

export default User
