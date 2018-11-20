import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { appchain } from './appchain'
import Routes from './routes/index'

window.addEventListener('neuronWebReady', () => {

    // inject new appchain method from neuron-web extension
    window.addMessenger(appchain)

    // set timeout to make sure load neurno-web first before render page.
    setTimeout(() => {
        ReactDOM.render(Routes, document.getElementById('root'))
    }, 100)
})

serviceWorker.unregister()
