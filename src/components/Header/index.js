import React from 'react'
import {
    Icon,
    NavBar,
} from 'antd-mobile'

class Header extends React.Component {

    render() {
        const titleName = this.props.titleName
        const icon = this.props.hasBack ? <Icon type="left"/> : ''
        const callback = this.props.callback
        return (
            <div className='header'>
                <NavBar
                    mode="light"
                    icon={icon}
                    onLeftClick={callback}
                >{titleName}</NavBar>
            </div>
        )
    }
}

export default Header
