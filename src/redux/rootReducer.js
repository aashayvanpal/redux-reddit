import { combineReducers } from 'redux';

import counterReducer from './Counter/counter.reducer';
import postsReducer from './Posts/posts.reducer';

const rootReducer = combineReducers({
	counter: counterReducer,
	reddit: postsReducer
});

export default rootReducer;
