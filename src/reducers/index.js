const initState = { subscribers: [], posts: [], comments: [] }
const reducer = (state = initState, action) => {
    console.log('reducer function', state)
    switch (action.type) {
        case 'GET_NEWS':
            console.log('inside get news', state)
            return { ...state, loading: true };
        case 'NEWS_RECEIVED':
            return { ...state, news: action.json[0], loading: false }

        case 'GET_SUBSCRIBERS':
            console.log('getsubscribers', state, action)
            return { ...state };
        case 'SUBSCRIBERS_RECEIVED':
            console.log('state subs received', state, action)
            return { ...state, subscribers: action.subscribers }
        default:
            return state;
    }
};

export default reducer;
