import * as actions from "../actionTypes/News";

const initialState = {
    isLoading: false,
    news: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCHING_START:
            return {
                ...state,
                isLoading: true
            };
        case actions.FETCHING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                news: action.payload.news
            };
        default:
            return state;
    }
};
