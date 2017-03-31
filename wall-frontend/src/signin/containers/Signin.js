import React from 'react'
import axios from 'axios'

class Signin extends React.Component {
  render() {
    return (
      <div className='Signin'>
        <div className='row'>
          <div className='col text-center'>
            <h2>Sign In</h2>
          </div>
        </div>
        <div className='row'>
          <form id='SigninForm' className='col' action='/signin' method='post'>
            <div className='form-group'>
              <label>Username</label>
              <input id='username' name="username" type='text' placeholder='jhondoe' className='form-control'/>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input id='password' name="password" type='password' placeholder='password' className='form-control'/>
            </div>
            <div className='form-group'>
              <input id='submit' type='submit' value='Sign In' className='btn btn-primary form-control'/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signin
