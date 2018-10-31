import {Provider} from 'mobx-react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import React from 'react'
import * as stores from '../stores'
import {Event, Register, Detail, Manage, New, Modify, Checkin} from "../containers"


export default (
    <Provider {...stores}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/event" component={Event}/>
                <Route exact path="/" component={Register}/>
                <Route exact path="/detail" component={Detail}/>
                <Route exact path="/manage" component={Manage}/>
                <Route exact path="/new" component={New}/>
                <Route exact path="/modify" component={Modify}/>
                <Route exact path="/checkin" component={Checkin}/>
            </Switch>
        </BrowserRouter>
    </Provider>
)

