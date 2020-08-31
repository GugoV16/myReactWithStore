import {GET_INIT_USERS} from "../constants";

let usersInitState = []

export const users = (state= usersInitState, {type, payload}) => {
    switch (type) {
        case GET_INIT_USERS:
            if (payload) {
                return payload
            }
            else {
                return state
            }
        default: return state
    }
}