import React from 'react'
import { inject, observer } from 'mobx-react'
import { Flex, } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './manageClubDetail.css'

@inject('clubmemberStore') @observer
class ManageClubDetail extends React.Component {
  render() {
    return (
      <Flex justify='center'>
        <Link to={'./modify'}>
          <div className='manageClubDetail__container--content'>
            <div className='manageClubDetail__content--name'>
              Cryptape慢跑俱乐部
            </div>
            <div className='manageClubDetail__container--deposit'>
              <div className='manageClubDetail__container--deposit-info'>
                <span className='manageClubDetail__content--deposit'>社团经费：2000.00</span>
                <div className='manageClubDetail__content--separate-line'></div>
                <span className='manageClubDetail__content--id'>ID: 1001</span>
              </div>
              <div className='manageClubDetail__content--rule'>
                进入本慢跑俱乐部者，每周最少跑1公里，否则给大家发红包，以
                Keep打卡为证！本周下雨较多，可以适当放松要求，本周不做强
                制要求，可以不发红包，下周不下雨了大家加油跑，不然又要贴
                膘了~~~~~
              </div>
            </div>
          </div>
        </Link>
      </Flex>
    )
  }
}

export default ManageClubDetail
