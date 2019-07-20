import { FETCH_POSTS} from "./type";
import { baseUrl } from "./baseUrl";

export const fetchPosts = (page) => dispatch => {
  fetch(baseUrl + "pictures/" + page)
    .then(res => res.json())
    .then(posts =>      
      dispatch({
        type: FETCH_POSTS,
        payload: posts.pictures,
        total: posts.count
      })    
    );
};

export const postLike = (image_id, like) => dispatch =>{
  console.log("username from postLike: " + like)
  fetch(baseUrl + "addlike/" + image_id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "Authorization": "JWT " + localStorage.token
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
      "content-type": "application/json",
      "Authorization": "JWT " + localStorage.token
    },
    body: JSON.stringify({      
      "comments": comment + ', '
    })
  })
    .then(res => res.json())
    .then(res => console.log(res));
};

export const deletePost = (image_id) => dispatch =>{
    console.log("DeletePost");
    fetch(baseUrl + "deletepost/" + image_id, {
      method: "DELETE",
      headers: {        
        "Authorization": "JWT " + localStorage.token
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

