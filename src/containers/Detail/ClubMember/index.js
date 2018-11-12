import React from 'react'
import {observer, inject} from 'mobx-react'
import {
	List,
} from 'antd-mobile'
import './clubMember.css'

const {Item} = List
const {Brief} = Item

@inject('clubmemberStore') @observer
class ClubMember extends React.Component {

	//TODO add club leader banner
	render() {
		const {
			memberDataList,
		} = this.props.clubmemberStore

		const memberList = memberDataList.map((data, index) => {
			return (
				<Item
					key={index}
					className='clubMember__listItem--personal-info'
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
			<div className='clubMember__lists--container'>
				<List>
					{memberList}
				</List>
			</div>
		)
	}
}

export default ClubMember
