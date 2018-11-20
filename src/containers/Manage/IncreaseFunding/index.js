import React from "react"
import { Button, Flex, InputItem } from "antd-mobile"
import './increaseFunding.css'

const IncreaseFunding = ({ handleIncreaseChange, hasInputFunding, handleFunding }) => {
  return (
    <Flex className='manageClubDetail__container--increase-funding' justify='center'>
      <InputItem
        className='manageClubDetail__input--increase-money'
        placeholder='金额'
        type='digit'
        onChange={handleIncreaseChange}
      />
      <Button
        disabled={!hasInputFunding}
        className={`manageClubDetail__button--increase-funding ${!hasInputFunding ? 'inactive' : ''}`}
        onClick={handleFunding}
      >
        增加经费
      </Button>
    </Flex>
  )
}

export default IncreaseFunding
