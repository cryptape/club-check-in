import React from 'react'
import './home.css'
import { inject, observer } from 'mobx-react'
import { Activity, Register } from '../index'

@inject('homeStore') @observer
class Home extends React.Component {

  constructor(props) {
    super(props)
    this.store = props.homeStore
    this.store.history = this.props.history
  }

  componentDidMount() {
    this.store.hasRegister()
    console.log('history in Home/index.js', this.props.history)
  }

  render() {
    const { isUser, history } = this.store
    return (
      isUser ? <Activity/> : <Register history={history}/>
    )
  }
}

export default Home
