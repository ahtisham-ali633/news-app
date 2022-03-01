import * as actions from "../actionTypes/News";
import NewsService from "../../services/NewsService";
import { store } from "../store";

const fetchingStart = () => {
    return { type: actions.FETCHING_START };
};

const fetchingSuccess = (payload) => {
    return { type: actions.FETCHING_SUCCESS, payload };
};

export const getNews = () => async (dispatch) => {
    dispatch(fetchingStart());
    const { News } = store.getState();
    let news = [];
    if (News.news.length <= 0) {
        news = await NewsService.getNews();
    } else {
        news = News.news;
    }
    
    const payload = {
        news
    }
    dispatch(fetchingSuccess(payload));
    return payload;
};