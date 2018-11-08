import React from 'react'
import {
    Icon,
    NavBar,
} from 'antd-mobile'

class Header extends React.Component {

    render() {
        let titleName = this.props.titleName
        return(
            <div className='header'>
                <NavBar
                    mode="light"
                    // icon={<Icon type="left"/>}
                    onLeftClick={() => console.log('onLeftClick')}
                >{titleName}</NavBar>
            </div>
        )
    }
}

export default Header
