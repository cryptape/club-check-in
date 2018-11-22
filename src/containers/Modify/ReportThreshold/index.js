import React from 'react'
import { InputItem } from 'antd-mobile'
import './reportThreshold.css'

const ReportThreshold = ({ reportThreshold, onChange }) => {
  return (
    <InputItem
      className='modifyClub__input--report-threshold'
      defaultValue={reportThreshold}
      type='number'
      onChange={(value) => {
        onChange(value, 'newReportThreshold')
      }}
    >举报阈值</InputItem>
  )
}

export default ReportThreshold
