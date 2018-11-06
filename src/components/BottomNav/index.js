import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Flex,
} from 'antd-mobile'
import './bottomNav.css'

const NavBarItem = ({className = '', src='', itemName='', callback}) => (
    <div className={`${className} navbar-item`} onClick={callback}>
        <img src={src} alt=""/>
        <div>{itemName}</div>
    </div>
);

@inject('navStore') @observer
class BottomNav extends React.Component {

    render() {

        const {
            handleActivity,
            handleCheckin,
            handlePersonal,
        } = this.props.navStore

        return (
            <div className='footer'>
                <Flex className='bottom-nav'>
                    <NavBarItem
                        className='navbar-item-activity'
                        src='tabbar_act_normal.png'
                        itemName='活动'
                        callback={handleActivity}
                    />
                    <NavBarItem
                        className='navbar-item-checkin'
                        src='tabbar_sign_normal.png'
                        itemName='打卡'
                        callback={handleCheckin}
                    />
                    <NavBarItem
                        className='navbar-item-personal'
                        src='tabbar_per_normal.png'
                        itemName='个人'
                        callback={handlePersonal}
                    />
                </Flex>
            </div>
        )
    }
}

export default BottomNav
