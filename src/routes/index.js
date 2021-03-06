import React from 'react'
import { Provider } from 'mobx-react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import * as stores from '../stores'
import { Activity, Checkin, Detail, Home, Manage, Modify, New, Register, User, } from '../containers'

export default (
  <Provider {...stores}>
    <HashRouter>
      <Switch>
        <Route exact path="/activity" component={Activity}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/detail/:clubID" component={Detail}/>
        <Route exact path="/manage/:clubID" component={Manage}/>
        <Route exact path="/new" component={New}/>
        <Route exact path="/modify/:clubID" component={Modify}/>
        <Route exact path="/checkin" component={Checkin}/>
        <Route exact path="/user" component={User}/>
      </Switch>
    </HashRouter>
  </Provider>
)

