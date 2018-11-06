import React from 'react'
import {
    Icon,
    Flex,
} from 'antd-mobile'
import './bottomNav.css'

const NavBarItem = ({className = '', src='', itemName='',}) => (
    <div className={`${className} navbar-item`}>
        <img src={src} alt=""/>
        <div>{itemName}</div>
    </div>
);


class BottomNav extends React.Component {
    render() {
        return (
            <div className='footer'>
                <Flex className='bottom-nav'>
                    <NavBarItem
                        className='navbar-item-activity'
                        src='tabbar_act_normal.png'
                        itemName='活动'
                    />
                    <NavBarItem
                        className='navbar-item-checkin'
                        src='tabbar_sign_normal.png'
                        itemName='打卡'
                    />
                    <NavBarItem
                        className='navbar-item-personal'
                        src='tabbar_per_normal.png'
                        itemName='个人'
                    />
                </Flex>
            </div>
        )
    }
}

export default BottomNav
