import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './home/Home'
import Signin from './signin/containers/Signin'
import Signup from './signup/containers/Signup'

const appContainer = document.querySelector('#App-container')

render(
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><a href='/logout'>logout</a></li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
    </div>
  </Router>,
  appContainer)
