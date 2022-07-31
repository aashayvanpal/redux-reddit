import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchNews() {

  const json = yield fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    .then(response => response.json());

  yield put({ type: "NEWS_RECEIVED", json: json.articles || [{ error: json.message }] });
}



function* fetchSubscribers() {
  const subscribers = yield axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => response.data.data.children)
    .then(subscribers => subscribers)
  console.log('got the subs here sukka', subscribers)
  // setSubscribers(subscribersArray)
  // setSelectedId(subscribersArray[0].data.name)
  // setSelectedName(subscribersArray[0].data.display_name_prefixed)
  // return { ...state, subscribers: subscribersArray }
  yield put({ type: "SUBSCRIBERS_RECEIVED", subscribers: subscribers });
}




function* actionWatcher() {
  yield takeLatest('GET_NEWS', fetchNews)
  yield takeLatest('GET_SUBSCRIBERS', fetchSubscribers)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
