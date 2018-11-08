import React from 'react'
import {Link} from "react-router-dom"
import {
    Icon,
    NavBar,
} from 'antd-mobile'

class Header extends React.Component {

    render() {
        const titleName = this.props.titleName
        const icon = this.props.backRoute ? <Link to={this.props.backRoute}><Icon type="left"/></Link> : ''
        return (
            <div className='header'>
                <NavBar
                    mode="light"
                    icon={icon}
                >{titleName}</NavBar>
            </div>
        )
    }
}

export default Header
