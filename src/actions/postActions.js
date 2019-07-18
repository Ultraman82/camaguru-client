import { FETCH_POSTS} from "./type";
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

export const postLike = (image_id, like) => dispatch =>{
  console.log("username from postLike: " + like)
  fetch(baseUrl + "addlike/" + image_id, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({      
      "like":like
    })
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

export const postComment = (image_id, comment) => dispatch =>{
//  console.log("username from postLike: " + like)
  fetch(baseUrl + "addcomment/" + image_id, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({      
      "comments": comment + ', '
    })
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

