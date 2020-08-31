import {GET_INIT_POSTS} from "../constants";

export const initPost = payload => ({
    type: GET_INIT_POSTS,
    payload
})
