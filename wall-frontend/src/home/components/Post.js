import React from 'react'

const Post = (props) => (
  <div className="card">
    <div className="card-block">
      <p className="card-text">{props.content}</p>
    </div>
  </div>
)

export default Post
