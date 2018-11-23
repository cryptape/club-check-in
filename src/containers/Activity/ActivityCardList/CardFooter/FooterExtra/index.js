import React from 'react'
import IsMember from './IsMember'
import NotMember from './NotMember'
import './footerExtra.css'

const FooterExtra = ({
                       thumbUpTimes,
                       hasReported,
                       hasThumbUp,
                       hasforbiddened,
                       handleReport,
                       handleThumbUp,
                       isMember
                     }) => {
  return (
    isMember ?
      <IsMember
        thumbUpTimes={thumbUpTimes}
        hasReported={hasReported}
        hasforbiddened={hasforbiddened}
        hasThumbUp={hasThumbUp}
        handleReport={handleReport}
        handleThumbUp={handleThumbUp}
      /> :
      <NotMember
        thumbUpTimes={thumbUpTimes}
        hasforbiddened={hasforbiddened}
        hasThumbUp={hasThumbUp}
        handleThumbUp={handleThumbUp}
      />
  )
}

export default FooterExtra
