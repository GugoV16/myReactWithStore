import {GET_INIT_POSTS} from "../constants";

let productsInitState = []


export const posts = (state=productsInitState, {type, payload}) => {
    switch (type) {
        case GET_INIT_POSTS:
            if (payload) {
                return payload
            }
            else {
                return state
            }
        default: return state
    }
}