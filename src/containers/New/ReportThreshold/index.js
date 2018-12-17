import React from 'react'
import { InputItem } from 'antd-mobile'
import './reportThreshold.css'

const ReportThreshold = ({ onChange, reportThreshold}) => {
  return (
    <InputItem
      className='newClub__input--report-threshold'
      placeholder='看你心情咯'
      type='number'
      value={reportThreshold}
      onChange={(val) => {
        onChange(val, 'reportThreshold')
      }}
    >举报阈值</InputItem>
  )
}

export default ReportThreshold
