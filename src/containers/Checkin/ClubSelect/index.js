import React from 'react'
import { Flex, List, Picker } from 'antd-mobile'

const ClubSelect = ({ clubName, handleSelectClub }) => {
  return (
    <div>
      <div className='checkin__content--club-select-title'>
        选择打卡社团
      </div>
      <Flex justify='center'>
        <div className='checkin__container--club-select'>
          <Picker data={clubName}
                  cols={1}
                  onOk={handleSelectClub}
                  extra={'请选择打卡社团'}
          >
            <List.Item arrow="horizontal"></List.Item>
          </Picker>
        </div>
      </Flex>
    </div>
  )
}

export default ClubSelect
