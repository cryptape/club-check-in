import React from 'react'
import { Flex, ImagePicker } from 'antd-mobile'

const RegisterAvatar = ({ files, onChange }) => {
  return (
    <div>
      <div className='register__content--avatar-title'>
        选择头像
      </div>
      <Flex.Item>
        <div className='register__img--avatar'>
          <ImagePicker
            files={files}
            length={2}
            onChange={onChange}
            selectable={!files.length}
          />
        </div>
      </Flex.Item>
    </div>
  )
}

export default RegisterAvatar
