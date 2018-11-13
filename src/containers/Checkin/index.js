import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Flex, ImagePicker, List, Picker, TextareaItem } from 'antd-mobile'
import { BottomNav, Header } from '../../components'
import './checkin.css'

@inject('checkinStore') @observer
class Checkin extends React.Component {

  render() {

    const {
      files,
      onChange,
      handleSelectClub,
      handleCheckin,
      clubName,
    } = this.props.checkinStore

    return (
      <div className='checkin__container--content'>
        <Header titleName='打卡'/>
        <div className='checkin__content--club-select-title'>
          选择打卡社团
        </div>
        <Flex justify='center'>
          <div className='checkin__container--club-select'>
            <Picker data={clubName}
                    cols={1}
                    onOk={handleSelectClub}
                    extra={'请选择打卡社团'}
            >
              <List.Item arrow="horizontal"></List.Item>
            </Picker>
          </div>
        </Flex>
        <div className='checkin__content--word'>
          打卡文字
        </div>
        <Flex justify='center'>
          <TextareaItem
            className='checkin__content--club-rule'
            rows={5}
            count={180}
          />
        </Flex>
        <div className='checkin__content--word-title'>
          打卡图片（可选）
        </div>
        <Flex.Item>
          <div className='checkin__img--checkin-pic'>
            <ImagePicker
              files={files}
              length={2}
              onChange={onChange}
              selectable={files.length === 0}
            />
          </div>
        </Flex.Item>
        <Flex justify='center'>
          <Button className='checkin__button--checkin' onClick={handleCheckin}>
            打卡
          </Button>
        </Flex>
        <BottomNav active={'checkin'}/>
      </div>
    )
  }
}

export default Checkin
