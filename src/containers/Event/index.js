import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('eventStore') @observer
class Event extends React.Component {

    handleHi = () => {
        this.props.eventStore.handleHello()
    }

    render() {
        return (
            <div onClick={this.handleHi}>Club Event page</div>
        )
    }
}

export default Event
