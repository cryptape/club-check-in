import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd-mobile'
import './userInfo.css'

const { Item } = List
const { Brief } = Item

const UserInfo = ({ userAddr, userThumbPic, userName }) => {
  return (
    <Link to={'/register'}>
      <Item
        arrow="horizontal"
        thumb={userThumbPic}
        multipleLine
      >
        {userName} <Brief>{userAddr}</Brief>
      </Item>
    </Link>
  )
}

export default UserInfo
