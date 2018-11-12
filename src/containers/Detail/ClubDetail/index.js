import React from 'react'
import { observer, inject } from 'mobx-react'
import './clubDetail.css'

@inject('clubmemberStore') @observer
class ClubDetail extends React.Component {
  render() {
    return (
      <div className='clubDetail__container--content'>
        <div className='clubDetail__content--name'>
          Cryptape慢跑俱乐部
        </div>
        <div className='clubDetail__container--deposit'>
          <div className='clubDetail__container--deposit-info'>
            <span className='clubDetail__content--deposit'>社团经费：2000.00</span>
            <div className='clubDetail__content--separate-line'></div>
            <span className='clubDetail__content--id'>ID:1001</span>
          </div>
          <div className='clubDetail__content--rule'>
            进入本慢跑俱乐部者，每周最少跑1公里，否则给大家发红包，以
            Keep打卡为证!
          </div>
        </div>
      </div>
    )
  }
}

export default ClubDetail
