import React from "react"
import { Flex, ImagePicker } from "antd-mobile"

const CheckinPic = ({ files, onChange }) => {
  return (
    <div>
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
    </div>
  )
}

export default CheckinPic
