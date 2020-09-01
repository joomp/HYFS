import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import {BrowserRouter as Router} from "react-router-dom"

const renderApp = () => {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)