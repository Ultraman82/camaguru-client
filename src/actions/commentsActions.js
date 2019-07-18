import { FETCH_COMMENTS, ADD_COMMENTS, COMMENTS_FAILED} from "./type";
import { baseUrl } from "./baseUrl";

export const fetchComments = () => dispatch => {
  fetch(baseUrl + "pictures/0")
    .then(res => res.json())
    .then(posts =>      
      dispatch({
        type: FETCH_COMMENTS,
        payload: posts.pictures
      })    
    );
};

export const postComment = (image_id, username, text) => dispatch =>{
//  console.log("username from postLike: " + like)
  fetch(baseUrl + "addcomment/" + image_id, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({      
      "comment": username + " : " + text
    })
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

/* export const postLike = (image_id, username) => dispatch => {
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
}; */

