# wall-db

A Database Wrapper for wall application

## Install

```
$ npm install wall-db --save
```

Or

```
$ yarn add wall-db
```

## Config

Set the following environment variables

```bash
export DB_NAME='blog'
export DB_USERNAME='myUsername'
export DB_PASSWORD='myPassword1234'
export DB_HOST='localhost'
export DB_ENGINE='mysql'
```

## Usage

``` js
const Db = require('wall-db')
const db = new Db()

// callback
db.saveUser(user, function (err, user) {
  // do something with user
})

// Promise
db.saveUser(user).then(function (user) {
  // do something with user
})

// callback
db.savePost(post, function (err, post) {
  // do something with post
})

// Promise
db.savePost(post).then(function (post) {
  // do something with post
})

// callback
db.listPosts(function (err, posts) {
  // do something with posts
})

// Promise
db.listPosts().then(function (posts) {
  // do something with posts
})

db.authenticate(username, password, function (err, isAuthenticated) {
  // do something with authentication
})
```

## Test
```js
yarn test
```
Or
```js
npm run test
```

## License MIT

Copyright (c) 2017 - Guillermo Lopez


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
