const initState = { subscribers: [], posts: [], comments: [] }

const reducer = (state = initState, action) => {
    console.log('reducer function', state)
    switch (action.type) {
        case 'GET_SUBSCRIBERS':
            console.log('getsubscribers', state, action)
            return { ...state };
        case 'SUBSCRIBERS_RECEIVED':
            console.log('state subs received', state, action)
            return { ...state, subscribers: action.subscribers }


        case 'GET_POSTS':
            console.log('getposts', state, action)
            return { ...state };
        case 'POSTS_RECEIVED':
            console.log('state posts received', state, action)
            return { ...state, posts: action.posts }


        case 'GET_COMMENTS':
            console.log('getcomments', state, action)
            return { ...state };
        case 'COMMENTS_RECEIVED':
            console.log('state comments received', state, action)
            return { ...state, comments: action.comments }
        default:
            return state;
    }
};

export default reducer;
