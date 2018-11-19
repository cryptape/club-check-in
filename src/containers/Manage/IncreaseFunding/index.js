import React from "react"
import { Button, Flex, InputItem } from "antd-mobile"
import './increaseFunding.css'

const IncreaseFunding = ({ handleMoney }) => {
  return (
    <Flex className='manageClubDetail__container--increase-funding' justify='center'>
      <InputItem
        className='manageClubDetail__input--increase-money'
        placeholder='金额'
      />
      <Button className='manageClubDetail__button--increase-funding' onClick={handleMoney}>
        增加经费
      </Button>
    </Flex>
  )
}

export default IncreaseFunding
