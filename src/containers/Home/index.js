import React from 'react'
import { inject, observer } from 'mobx-react'
import { Flex, } from 'antd-mobile'
import { BottomNav, Header } from '../../components'
import './home.css'


class Home extends React.Component {

  render() {
    return (
      <div className='home__container--content'>
        <Flex>
          <Flex.Item>
            <Header titleName='社团圈'/>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>
            <BottomNav/>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default Home
