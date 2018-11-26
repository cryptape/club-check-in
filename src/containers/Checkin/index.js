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
    this.store = props.checkinStore
  }

  componentDidMount() {
    this.store.clearPageInfo()
  }

  handleCheck = () => {
    this.store.handleCheckin(this.props.history)
  }

  componentDidMount() {
    this.store.getRegisteredClubs()
  }

  render() {

    const {
      files,
      onFilesChange,
      onCheckinContentChange,
      handleSelectClub,
      isInfoCompleted,
      clubNameList,
    } = this.store

    const clubsToShow = []

    for (let i = 0; i < clubNameList.length; i++) {
      clubsToShow.push({
        label: clubNameList.slice()[i],
        value: clubNameList.slice()[i],
      })
    }

    console.log('clubsToShow', clubsToShow)

    return (
      <div className='checkin__container'>
        <Header titleName='打卡'/>
        <div className='checkin__container--content'>
          <ClubSelect handleSelectClub={handleSelectClub} clubName={clubsToShow}/>
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
