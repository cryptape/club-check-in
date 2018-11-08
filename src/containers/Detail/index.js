import React from 'react'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import {
    Button,
} from "antd-mobile"
import ClubMember from './ClubMember'
import './detail.css'

@inject('detailStore') @observer
class Detail extends React.Component {

    render() {

        const {
            handleManageMember,
        } = this.props.detailStore

        return (
            <div className='detail-container'>
                <Header
                    titleName='社团详情'
                    backRoute='./personal'
                />
                <div className='club-detail-pannel'>
                    <div className='club-detail-name'>
                        Cryptape慢跑俱乐部
                    </div>
                    <div className='club-detail-deposit-panel'>
                        <div className='club-detail-deposit-infos'>
                            <span className='club-detail-deposit'>社团经费：2000.00</span>
                            <div className='club-detail-line'></div>
                            <span className='club-detail-id'>ID:1001</span>
                        </div>
                        <div className='club-detail-rule'>
                            进入本慢跑俱乐部者，每周最少跑1公里，否则给大家发红包，以
                            Keep打卡为证！进入本慢跑俱乐部者，每周最少跑1公里。
                        </div>
                    </div>
                    <ClubMember/>
                    <Button
                        className='btn-detail-manage'
                        onClick={handleManageMember}
                    >
                        管理
                    </Button>
                </div>
            </div>
        )
    }
}

export default Detail
