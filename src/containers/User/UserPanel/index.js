import React from 'react'
import { inject, observer } from 'mobx-react'
import { Flex, } from 'antd-mobile'
import UserInfo from './UserInfo'
import ClubButton from './ClubButton'
import './userPanel.css'

@inject('userStore') @observer
class UserlPanel extends React.Component {

  render () {
    const {
      handleJoin,
      thumbPic,
      joinIcon,
      createIcon,
    } = this.props.userStore

    return (
      <Flex>
        <Flex.Item>
          <div className='user__container--user-info'>
            <UserInfo thumbPic={thumbPic}/>
            <ClubButton
              joinIcon={joinIcon}
              createIcon={createIcon}
              handleJoin={handleJoin}
            />
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default UserlPanel
