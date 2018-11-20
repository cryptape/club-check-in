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
  constructor(props) {
    super(props)
    this.state = props.checkinStore
  }

  handleCheck = () => {
    this.state.handleCheckin(this.props.history)
  }

  render() {

    const {
      files,
      onFilesChange,
      onCheckinContentChange,
      handleSelectClub,
      clubName,
      isInfoCompleted,
    } = this.state

    return (
      <div className='checkin__container'>
        <Header titleName='打卡'/>
        <div className='checkin__container--content'>
          <ClubSelect handleSelectClub={handleSelectClub} clubName={clubName}/>
          <ClubRule onChange={onCheckinContentChange}/>
          <CheckinPic files={files} onChange={onFilesChange}/>
          <Flex justify='center'>
            <Button
              disabled={!isInfoCompleted}
              className={`checkin__button--checkin ${!isInfoCompleted ? 'inactive' : ''}`}
              onClick={this.handleCheck}
            >
              打卡
            </Button>
          </Flex>
          <BottomNav active={'checkin'}/>
        </div>
      </div>
    )
  }
}

export default Checkin
