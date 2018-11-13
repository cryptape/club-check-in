import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, } from 'antd-mobile'
import { activityIcon, checkinIcon, personalIcon, } from './svg'
import './bottomNav.css'

const BottomNav = ({ active }) => (
  <Flex className='bottomNav__container--content'>
    <Link className='bottomNav__container--nav-item' to={'./activity'}>
      <div className={active === 'activity' ? 'bottomNav__container--nav-item-active ' : ''}>
        {activityIcon}
        <div>活动</div>
      </div>
    </Link>
    <Link className='bottomNav__container--nav-item' to={'./checkin'}>
      <div className={active === 'checkin' ? 'bottomNav__container--nav-item-active ' : ''}>
        {checkinIcon}
        <div>打卡</div>
      </div>
    </Link>
    <Link className='bottomNav__container--nav-item' to={'./personal'}>
      <div className={active === 'personal' ? 'bottomNav__container--nav-item-active ' : ''}>
        {personalIcon}
        <div>个人</div>
      </div>
    </Link>
  </Flex>
)

export default BottomNav
