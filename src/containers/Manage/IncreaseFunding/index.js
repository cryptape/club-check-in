import React from 'react'
import { Button, Flex, InputItem } from 'antd-mobile'
import './increaseFunding.css'

const IncreaseFunding = ({ hasInputFunding, handleFunding, onInput, history }) => {
  return (
    <Flex className='manageClubDetail__container--increase-funding' justify='center'>
      <InputItem
        className='manageClubDetail__input--increase-money'
        placeholder='金额'
        type='text'
        onInput={onInput}
      />
      <Button
        disabled={!hasInputFunding}
        className={`manageClubDetail__button--increase-funding ${!hasInputFunding ? 'inactive' : ''}`}
        onClick={() => handleFunding(history)}
      >
        增加经费
      </Button>
    </Flex>
  )
}

export default IncreaseFunding
