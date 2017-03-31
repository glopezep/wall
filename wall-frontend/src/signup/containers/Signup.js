import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
  async handleSubmit(e) {
    e.preventDefault()

    const form = document.querySelector('#SignupForm')
    const data = new FormData(form)
    const userData = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password')
    }

    await axios.post('/signup', userData)
    window.location = '/signin'
  }

  render() {
    return (
      <div className='Signup'>
        <div className='row'>
          <div className='col text-center'>
            <h2>Sign Up</h2>
          </div>
        </div>
        <div className='row'>
          <form id='SignupForm' className='col' onSubmit={(e) => this.handleSubmit(e)}>
            <div className='form-group'>
              <label>Username</label>
              <input id='username' name='username' type='text' placeholder='jhondoe' className='form-control'/>
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input id='email' type='email' name='email' placeholder='jhondoe@gmail.com' className='form-control'/>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input id='password' type='password' name='password' placeholder='password' className='form-control'/>
            </div>
            <div className='form-group'>
              <input id='submit' type='submit' value='Register' className='btn btn-primary form-control'/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup
