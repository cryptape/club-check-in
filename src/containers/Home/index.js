import React from 'react'
import { BottomNav, Header } from '../../components'
import './home.css'


class Home extends React.Component {

  render() {
    return (
      <div className='home__container'>
        <Header titleName='社团圈'/>
        <div className='home__container--content'>
          <BottomNav/>
        </div>
      </div>
    )
  }
}

export default Home
