import React from "react"
import { Button } from "antd-mobile"

const BottomButton = ({ props }) => {
  return (
    props.isLeader ?
      <Button href='#/manage'
              className='detail__button--club-manage'
              onClick={props.handleManageMember}
      >
        管理
      </Button>
      :
      <Button className='detail__button--club-manage' onClick={props.handleQuitClub}>
        退出
      </Button>
  )
}

export default BottomButton
