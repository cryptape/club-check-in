import React from 'react'
import { inject, observer } from 'mobx-react'
import { Header, BottomNav } from '../../components'
import UserPanel from './UserPanel'
import ClubListItem from './ClubListItem'
import './user.css'

@inject('userStore') @observer
class User extends React.Component {

  render() {
    return (
      <div className='user__container--content'>
        <Header titleName='个人'/>
        <UserPanel/>
        <ClubListItem/>
        <BottomNav active={'user'}/>
      </div>
    )
  }
}

export default User
