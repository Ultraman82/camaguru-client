import { FETCH_POSTS } from "../actions/type";

const initialState = {
  items: [],
  total: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
        total: action.total
      };    
    default:
      return state;
  }
}
