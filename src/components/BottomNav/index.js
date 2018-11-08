import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    Flex,
} from 'antd-mobile'
import './bottomNav.css'

const NavBarItem = ({className = '', svg, itemName = '', callback}) => (
    <div className={`${className} navbar-item`} onClick={callback}>
        {svg}
        <div>{itemName}</div>
    </div>
);

@inject('navStore') @observer
class BottomNav extends React.Component {

    render() {

        const {
            toggleActive,
            activityIcon,
            checkinIcon,
            personalIcon,
        } = this.props.navStore

        return (
            <Flex className='bottom-nav'>
                <NavBarItem
                    className='activity active-nav-item'
                    svg={activityIcon}
                    itemName='活动'
                    callback={toggleActive}
                />
                <NavBarItem
                    className='checkin'
                    svg={checkinIcon}
                    itemName='打卡'
                    callback={toggleActive}
                />
                <NavBarItem
                    className='personal'
                    svg={personalIcon}
                    itemName='个人'
                    callback={toggleActive}
                />
            </Flex>
        )
    }
}

export default BottomNav
