import React from 'react'
import { inject, observer } from 'mobx-react'
import { BottomNav } from '../../components'
import UserPanel from './UserPanel'
import ClubListItem from './ClubListItem'
import './user.css'
import { ChangeTitle } from '../../utils'

@inject('userStore') @observer
class User extends React.Component {
  
  constructor(props) {
    super(props)
    this.store = this.props.userStore
  }

  componentDidMount() {
    ChangeTitle('个人', 'close')
    this.store.getUserInfo()
  }

  render() {
    return (
      <div className='user__container'>
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
