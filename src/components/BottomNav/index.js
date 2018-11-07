import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Flex,
} from 'antd-mobile'
import './bottomNav.css'

const NavBarItem = ({className = '', src = '', itemName = '', callback}) => (
    <div className={`${className} navbar-item`} onClick={callback}>
        <img src={src} alt=""/>
        <div>{itemName}</div>
    </div>
);

@inject('navStore') @observer
class BottomNav extends React.Component {

    render() {

        const {
            toggleActive,
        } = this.props.navStore

        return (
            <Flex className='bottom-nav'>
                <NavBarItem
                    className='activity active-nav-item'
                    src='tabbar_act_normal.png'
                    itemName='活动'
                    callback={toggleActive}
                />
                <NavBarItem
                    className='checkin'
                    src='tabbar_sign_normal.png'
                    itemName='打卡'
                    callback={toggleActive}
                />
                <NavBarItem
                    className='personal'
                    src='tabbar_per_normal.png'
                    itemName='个人'
                    callback={toggleActive}
                />
            </Flex>
        )
    }
}

export default BottomNav
