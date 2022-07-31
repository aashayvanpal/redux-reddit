import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_SUBSCRIBERS_SUCCESS, GET_SUBSCRIBERS_FETCH } from './Subscribers/subscriber.actions'
import axios from 'axios'

async function subscribersFetch() {
    return await axios.get('https://oauth.reddit.com/subreddits/mine/subscriber', {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => response.data.data.children)
        .then(subscribers => {
            const subscribersArray = subscribers.map(subscriber => {
                return subscriber
            })
            console.log('inside get_subscribers', subscribersArray)
            // setSubscribers(subscribersArray)
            // setSelectedId(subscribersArray[0].data.name)
            // setSelectedName(subscribersArray[0].data.display_name_prefixed)
            return subscribersArray
        })
}

function* getSubscribers() {
    const subscribers = yield call(subscribersFetch)
    yield put({ type: GET_SUBSCRIBERS_SUCCESS, subscribers })
}

function* mySaga() {
    yield takeEvery(GET_SUBSCRIBERS_FETCH, getSubscribers)
}

export default mySaga