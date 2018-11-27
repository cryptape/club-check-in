import React from 'react'
import { Button } from 'antd-mobile'

const BottomButton = ({ isLeader, handleManageMember, handleQuitClub, clubID }) => {
  return (
    isLeader ?
      <Button href={`#/manage/${clubID}`}
              className='detail__button--club-manage'
              onClick={handleManageMember}
      >
        管理
      </Button>
      :
      <Button className='detail__button--club-manage' onClick={() => { handleQuitClub(clubID)}}>
        退出
      </Button>
  )
}

export default BottomButton
