import React from 'react'

const activityIcon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <g>
    <path fillOpacity=".01" d="M0 0h40v40H0z"/>
    <path
      d="M13.09 31.338l.027-.04a1.363 1.363 0 0 0-.244-1.833c-2.37-1.951-3.449-4.014-3.916-5.23a1.365 1.365 0 0 0-1.505-.874l-.058.01a1.374 1.374 0 0 0-1.037 1.86c.608 1.574 1.937 4.068 4.721 6.372.618.512 1.55.392 2.011-.265M18.41 0c-.733 0-1.412.589-1.398 1.408.092 5.757-1.92 8.286-2.724 9.064-.016.016-.055.023-.114.023-.622 0-3.473-.842-4.888-1.648C8.119 8.18 6.555 6.983 5.453 6.1a1.375 1.375 0 0 0-.866-.306c-.524 0-1.038.298-1.277.827C.872 12.008 0 18.553 0 20.215c0 10.782 8.623 19.55 19.35 19.78.136.004.276.005.413.005 8.95 0 16.896-6.288 19.18-14.975.02-.07.038-.14.055-.212 1.054-4.19.428-8.629-1.412-12.538L34.26 5.214a1.36 1.36 0 0 0-1.25-.796c-.515 0-1.033.278-1.286.827-.924 2.005-1.818 3.346-2.403 4.117a.658.658 0 0 1-.527.263.717.717 0 0 1-.626-.378c-2.51-4.56-6.535-7.528-9.044-9.046A1.375 1.375 0 0 0 18.409 0m1.302 3.955c1.979 1.468 4.386 3.686 6.012 6.639a3.509 3.509 0 0 0 3.07 1.822c1.088 0 2.09-.498 2.75-1.366.375-.495.86-1.189 1.394-2.097l2.124 4.512c1.644 3.491 2.08 7.28 1.231 10.669l-.047.181C34.28 31.787 27.348 37.21 19.763 37.21c-.117 0-.236 0-.353-.003-9.164-.198-16.619-7.82-16.619-16.991 0-1.073.611-6.114 2.381-10.796 1.072.806 1.986 1.427 2.728 1.852 1.651.942 4.992 2.015 6.273 2.015 1.007 0 1.672-.438 2.055-.808 1.183-1.146 3.045-3.679 3.483-8.523"/>
  </g>
</svg>

const checkinIcon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <g>
    <path fill="#FFF" fillOpacity=".01" d="M0 0h40v40H0z"/>
    <path
      d="M18.371 27.262l-3.251-3.251-.866-.866a1.38 1.38 0 1 0-1.952 1.95l4.117 4.117a2.76 2.76 0 0 0 3.902 0l9.79-9.789a1.38 1.38 0 0 0-.006-1.955l-.004-.005a1.379 1.379 0 0 0-1.947.006l-9.783 9.793zm18.526 7.335c0 .762-.62 1.38-1.38 1.38H4.137a1.38 1.38 0 0 1-1.378-1.38V9.77c0-.76.618-1.38 1.379-1.38h6.924v4.024a1.38 1.38 0 0 0 2.759 0V8.39h12.012v4.024a1.379 1.379 0 1 0 2.759 0V8.39h6.925c.76 0 1.38.62 1.38 1.38v24.827zm-1.38-28.965h-6.925V1.379a1.38 1.38 0 0 0-2.759 0v4.253H13.821V1.379a1.379 1.379 0 1 0-2.759 0v4.253H4.138A4.138 4.138 0 0 0 0 9.77v24.827a4.138 4.138 0 0 0 4.138 4.138h31.38a4.139 4.139 0 0 0 4.137-4.138V9.77a4.139 4.139 0 0 0-4.138-4.138z"/>
  </g>
</svg>

const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <g>
    <path fill="#FFF" fillOpacity=".01" d="M0 0h40v40H0z"/>
    <path
      d="M27.586 19.425v-4.138c0-.759-.62-1.38-1.38-1.38-.758 0-1.378.621-1.378 1.38v4.138c0 .758.62 1.38 1.379 1.38s1.38-.622 1.38-1.38m-12.76 0v-4.138c0-.759-.62-1.38-1.379-1.38-.758 0-1.379.621-1.379 1.38v4.138c0 .758.62 1.38 1.38 1.38.758 0 1.379-.622 1.379-1.38m5-19.425C8.878 0 0 8.877 0 19.828c0 10.95 8.877 19.827 19.828 19.827 10.95 0 19.827-8.877 19.827-19.827C39.655 8.878 30.778 0 19.828 0m0 2.759c9.412 0 17.069 7.656 17.069 17.069 0 9.41-7.657 17.069-17.07 17.069-9.412 0-17.068-7.658-17.068-17.07 0-9.412 7.656-17.068 17.069-17.068"/>
  </g>
</svg>

export {
  activityIcon,
  checkinIcon,
  userIcon,
}

