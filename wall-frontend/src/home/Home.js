import React from 'react'
import axios from 'axios'
import Post from './components/Post'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      posts: []
    }
  }
  async componentDidMount() {
    const user = await axios.get('/whoami')
    const posts = await axios.get('/api/post/list')
    this.setState({ user: user.data, posts: posts.data })
    console.log('Se monto');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) return true
    return false
  }

  async handleSumit(e) {
    e.preventDefault()

    const userId = this.state.user.id
    const form = document.querySelector('#FormPost')
    const data = new FormData(form)
    const postData = {
      content: data.get('content'),
      userId
    }
    const post = await axios.post('/api/post', postData)
    this.setState({ posts: [...this.state.posts, post.data] })
  }

  render() {
    return (
      <div className='Home'>
        <form id='FormPost' onSubmit={(e) => this.handleSumit(e)}>
          <input type='textarea' name='content'/>
          <input type='submit' value='Comment'/>
        </form>
        {this.state.posts.map((post, index) => <Post key={index} {...post} />)}
      </div>
    )
  }
}

export default Home
