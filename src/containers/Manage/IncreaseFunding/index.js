import React from "react"
import { Button, Flex, InputItem } from "antd-mobile"
import './increaseFunding.css'

const IncreaseFunding = ({ handleIncreaseChange, hasInputFunding, handleFunding, onInput }) => {
  return (
    <Flex className='manageClubDetail__container--increase-funding' justify='center'>
      <InputItem
        className='manageClubDetail__input--increase-money'
        placeholder='金额'
        type='text'
        onChange={handleIncreaseChange}
        onInput={onInput}
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
