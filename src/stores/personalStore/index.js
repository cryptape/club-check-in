import {observable, action} from 'mobx'
import React from "react";

const log = console.log.bind(console, '### personalStore ')

const thumbPic = 'avatar.png'
const joinIcon = <img src="per_join.png" alt=""/>
const createIcon = <img src="per_create.png" alt=""/>

class PersonalStore {
    constructor() {
        this.thumbPic = thumbPic
        this.joinIcon = joinIcon
        this.createIcon = createIcon
    }
    @action handleJoin = () => {
        log('handleJoin btn')
    }

    @action handleCreate = () => {
        log('handleCreate btn')
    }

    @action handleConfig = () => {
        log('switch to register page')
    }
}

const personalStore = new PersonalStore()

export default personalStore

