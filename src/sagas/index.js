import { put, takeLatest, all } from 'redux-saga/effects';
import axios from '../config/axios.js';

function* fetchSubscribers() {
  const subscribers = yield axios.get('/subreddits/mine/subscriber', {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => response.data.data.children)
    .then(subscribers => subscribers)
  // console.log('Subscribers:', subscribers)
  yield put({ type: "SUBSCRIBERS_RECEIVED", subscribers: subscribers });
}

function* fetchPosts() {
  const posts = yield axios.get('/best?limit=100', {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      // console.log('best response:', response)
      // console.log('data:', response.data.data.children)
      const posts = response.data.data.children.map(post => {
        return post
      })
      return posts
    })
  // console.log('Posts:', posts)
  yield put({ type: "POSTS_RECEIVED", posts: posts });

}


function* fetchComments(link) {
  console.log('payload check ', link)
  const { selectedName, postId, selectedArticle } = link.payload
  const comments = yield axios.get(`/${selectedName}/comments/${postId}/${selectedArticle}?dept=1`, {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      // console.log('Comments:', response)
      // console.log('data:', response.data.data.children)
      const comments = response.data[1].data.children.map(comment => {
        return comment
      })
      return comments
    })
  console.log('Comments:', comments)
  yield put({ type: "COMMENTS_RECEIVED", comments: comments });

}

function* actionWatcher() {
  yield takeLatest('GET_SUBSCRIBERS', fetchSubscribers)
  yield takeLatest('GET_POSTS', fetchPosts)
  yield takeLatest('GET_COMMENTS', fetchComments)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
