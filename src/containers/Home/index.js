import React from 'react'
import './home.css'
import { inject, observer } from 'mobx-react'
import { Activity, Register } from '../index'

@inject('homeStore') @observer
class Home extends React.Component {

  constructor(props) {
    super(props)
    this.store = props.homeStore
  }

  componentDidMount() {
    this.store.hasRegister()
  }

  render() {
    const { isUser } = this.store
    return (
      isUser ? <Activity/> : <Register/>
    )
  }
}

export default Home
