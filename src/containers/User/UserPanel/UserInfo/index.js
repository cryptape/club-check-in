import React from "react"
import { Link } from "react-router-dom"
import { List } from "antd-mobile"
import './userInfo.css'

const { Item } = List
const { Brief } = Item

const UserInfo = ({ thumbPic }) => {
  return (
    <Link to={'/register'}>
      <Item
        arrow="horizontal"
        thumb={thumbPic}
        multipleLine
      >
        realwwy <Brief>0X291302034049012393Ba0414</Brief>
      </Item>
    </Link>
  )
}

export default UserInfo
