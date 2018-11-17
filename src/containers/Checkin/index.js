import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex } from 'antd-mobile'
import { BottomNav, Header } from '../../components'
import ClubSelect from './ClubSelect'
import ClubRule from './ClubRule'
import CheckinPic from './CheckinPic'
import './checkin.css'

@inject('checkinStore') @observer
class Checkin extends React.Component {
  constructor() {
    super()

  }

  render() {

    const {
      files,
      onChange,
      handleSelectClub,
      handleCheckin,
      clubName,
    } = this.props.checkinStore

    return (
      <div className='checkin__container--content'>
        <Header titleName='打卡'/>
        <ClubSelect handleSelectClub={handleSelectClub} clubName={clubName}/>
        <ClubRule/>
        <CheckinPic files={files} onChange={onChange}/>
        <Flex justify='center'>
          <Button className='checkin__button--checkin' onClick={handleCheckin}>
            打卡
          </Button>
        </Flex>
        <BottomNav active={'checkin'}/>
      </div>
    )
  }
}

export default Checkin
