import React from 'react'
import { inject, observer } from 'mobx-react'
import { Flex, } from 'antd-mobile'
import UserInfo from './UserInfo'
import ClubButton from './ClubButton'
import { constructPicUrl } from '../../../utils'
import './userPanel.css'

@inject('userStore') @observer
class UserlPanel extends React.Component {

  render() {
    const {
      handleJoin,
      joinIcon,
      createIcon,
      userAddr,
      userName,
      userThumbPic,
    } = this.props.userStore

    console.log('userAddr', userAddr)

    return (
      <Flex>
        <Flex.Item>
          <div className='user__container--user-info'>
            <UserInfo  
              userAddr={userAddr}
              userThumbPic={constructPicUrl(userThumbPic)}
              userName={userName}
              />
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
