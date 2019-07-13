import { REGISTER } from "./type";
import { baseUrl } from "./baseUrl";

/* export const fetchPosts = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};
 */
export const register = userData => dispatch => {
  fetch(baseUrl + "register", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: REGISTER,
        payload: post
      })
    );
};
