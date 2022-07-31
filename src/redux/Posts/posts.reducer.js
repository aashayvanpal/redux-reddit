const INITIAL_STATE = {
    subscribers: [],
    sample: 'value testu'
};



const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'GET_SUBSCRIBERS_SUCCESS': return { ...state, subscribers: action.subscribers }
        default:
            return { ...state };
    }
};

export default reducer;
