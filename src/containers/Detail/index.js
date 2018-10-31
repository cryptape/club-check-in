import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('detailStore') @observer
class Detail extends React.Component {

    render() {
        return (
            <div>Club Details page</div>
        )
    }
}

export default Detail
