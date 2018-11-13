import React from 'react';
import { observer, inject } from 'mobx-react'
import {Header, BottomNav} from "../../components"


@inject('checkinStore') @observer
class Checkin extends React.Component {

  render() {
    return (
      <div className='checkin__container--content'>
        <Header titleName='打卡'/>
        <BottomNav active={'checkin'}/>
      </div>
    )
  }
}

export default Checkin
