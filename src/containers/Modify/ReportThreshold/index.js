import React from "react"
import { InputItem } from "antd-mobile"
import './reportThreshold.css'

const ReportThreshold = ({ reportThreshold }) => {
  return (
    <InputItem
      className='modifyClub__input--report-threshold'
      defaultValue={reportThreshold}
    >举报阈值</InputItem>
  )
}

export default ReportThreshold
