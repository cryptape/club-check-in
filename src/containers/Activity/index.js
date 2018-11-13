import React from 'react';
import { inject, observer } from 'mobx-react';
import { BottomNav, Header } from "../../components"

@inject('activityStore') @observer
class Activity extends React.Component {

  render() {
    return (
      <div className='activity__container--content'>
        <Header titleName='社团圈'/>
        <BottomNav active={'activity'}/>
      </div>
    )
  }
}

export default Activity
