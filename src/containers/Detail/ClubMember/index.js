import React from 'react'
import {observer, inject} from 'mobx-react'
import {
    List,
} from 'antd-mobile'
import './clubmember.css'

const Item = List.Item
const Brief = Item.Brief

@inject('clubmemberStore') @observer
class ClubMember extends React.Component {
    //TODO add club leader banner
    render() {
        const {
            handleMemberDetail,
            memberDataList,
        } = this.props.clubmemberStore

        const memberList = memberDataList.map((data, index) => {
            return (
                <Item
                    arrow="empty"
                    thumb={data['avatar']}
                    multipleLine
                >
                    {data['name']}
                    <Brief>
                        <div>{data['address']}</div>
                        <div>{`社团积分:${data['points']}`}</div>
                    </Brief>
                </Item>
            )
        })

        return (
            <div className='club-detail-lists'>
                <List>
                    {memberList}
                </List>
            </div>
        )
    }
}

export default ClubMember
