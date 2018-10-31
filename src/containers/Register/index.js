import React from 'react';
import {observer, inject} from 'mobx-react';

@inject('registerStore') @observer
class Register extends React.Component {

    render() {
        return (
            <div>Register page</div>
        )
    }
}

export default Register
