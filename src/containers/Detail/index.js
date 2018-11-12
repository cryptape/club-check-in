import React from 'react'
import {observer, inject} from 'mobx-react'
import {
	Button,
} from "antd-mobile"
import {Header} from '../../components'
import ClubMember from './ClubMember'
import ClubDetail from './ClubDetail'
import './detail.css'

@inject('detailStore') @observer
class Detail extends React.Component {

	//TODO add club leader banner
	render() {

		const {
			handleManageMember,
		} = this.props.detailStore

		return (
			<div className='detail-container'>
				<Header titleName='社团详情' backRoute='./personal'/>
				<div className='club-detail-panel'>
					<ClubDetail/>
					<ClubMember/>
					<Button className='btn-detail-manage' onClick={handleManageMember}>
						管理
					</Button>
				</div>
			</div>
		)
	}
}

export default Detail
