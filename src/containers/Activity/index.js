import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('activityStore') @observer
class Activity extends React.Component {

  handleHi = () => {
    this.props.eventStore.handleHello()
  }

  render() {
    return (
      <div onClick={this.handleHi}>Club Activity page</div>
    )
  }
}

export default Activity
