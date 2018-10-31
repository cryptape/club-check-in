import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('modifyStore') @observer
class Modify extends React.Component {

    render() {
        return (
            <div>Modify club info page</div>
        )
    }
}

export default Modify
