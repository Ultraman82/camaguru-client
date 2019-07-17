import { FETCH_POSTS, NEW_POST } from "./type";
import { baseUrl } from "./baseUrl";

export const fetchPosts = () => dispatch => {
  fetch(baseUrl + "pictures/0")
    .then(res => res.json())
    .then(posts =>      
      dispatch({
        type: FETCH_POSTS,
        payload: posts.pictures
      })    
    );
};

export const createPost = (image_id, username) => dispatch => {
  fetch(baseUrl + "picedit/" + image_id, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: {      
      "username":username
    }
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};
