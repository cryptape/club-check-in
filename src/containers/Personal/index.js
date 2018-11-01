import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('personalStore') @observer
class Personal extends React.Component {

    render() {
        return (
            <div>Personal info page</div>
        )
    }
}

export default Personal
