import React from 'react'
import { inject, observer } from 'mobx-react'
import { Flex, } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './manageClubDetail.css'

@inject('clubMemberStore') @observer
class ManageClubDetail extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.clubMemberStore
  }

  render() {

    const {
      detailPageClubInfo,
    } = this.store

    return (
      <Flex justify='center'>
        <Link to={`/modify/${this.props.clubID}`}>
          <div className='manageClubDetail__content--container'>
            <div className='manageClubDetail__content--name'>
              <div>
                {detailPageClubInfo.clubName}
              </div>
            </div>
            <div className='manageClubDetail__container--funding'>
              <div className='manageClubDetail__container--funding-info'>
                  <span className='manageClubDetail__content--funding'>社团经费：{detailPageClubInfo.clubFunding}</span>
                  <div className='manageClubDetail__content--separate-line'></div>
                  <span className='manageClubDetail__content--id'>ID: {detailPageClubInfo.clubID}</span>
              </div>
              <div className='manageClubDetail__content--rule'>{detailPageClubInfo.clubRule}</div>
            </div>
          </div>
        </Link>
      </Flex>
    )
  }
}

export default ManageClubDetail
