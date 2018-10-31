import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('manageStore') @observer
class Manage extends React.Component {

    render() {
        return (
            <div>Club Management page</div>
        )
    }
}

export default Manage
