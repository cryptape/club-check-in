import React from 'react'
import {observer, inject} from 'mobx-react'
import {Button} from 'antd-mobile'

@inject('registerStore') @observer
class Register extends React.Component {

    handleRegister = () => {
        this.props.registerStore.handleHello()
    }

    render() {
        return (
            <div>Register page
                <Button type={"primary"} onClick={this.handleRegister}>Register</Button>
            </div>
        )
    }
}

export default Register

