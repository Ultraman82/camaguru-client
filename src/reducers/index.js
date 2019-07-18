import { combineReducers } from "redux";
import postReducer from "./postReducer";
import { Comments } from './comments';

export default combineReducers({
  posts: postReducer,
  comments: Comments
});
