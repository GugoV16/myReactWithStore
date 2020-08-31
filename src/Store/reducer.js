import {combineReducers} from "redux";
import {posts} from "./posts/reducer";
import {users} from "./users/reducer";

export const rootReducer = combineReducers({
    posts,
    users
})