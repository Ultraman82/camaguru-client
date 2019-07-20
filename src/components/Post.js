import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts, postLike, postComment, deletePost } from "../actions/postActions";
import { Card, CardImg, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import FetchComments from './FetchComments';
import styles from './App.module.css';
import { baseUrl } from "../actions/baseUrl";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current_page:1,
      total: 0,
      posts: []   
     };    
  }

  fetchPosts = page => {
    fetch(baseUrl + "pictures/" + page)
    .then(res => res.json())
    .then(posts =>      
      {
        this.setState({
        posts: posts.pictures,
        total: posts.count,      
        current_page: page,
      });
      console.log(posts);
    }      
    );
  }
  /* fetchPosts = async page => {
    let response = await fetch(baseUrl + "pictures/" + page);
    const data = await response.json();

    this.setState({
      posts: data.pictures,
      total: data.count,      
      current_page: page,
    });
  }
   */
  componentWillMount() {
    //this.props.fetchPosts(this.state.current_page);        
    this.fetchPosts(1);    
  }  

  /* componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  } */  

  RenderDel(username, id) {
    if (username === localStorage.username) {
      return (
        <Button color="danger" onClick={() => {                        
          if(window.confirm('Delete the item?'))
            {
              this.props.deletePost(id);
              window.location.reload(); 
            }        
        }}>Delete</Button>
      )
    }
  }

  /* RenderPage(count) {    
    let pageNumbers = [];
    for(let i = 0; i <= count/5; i++)
      pageNumbers.push(i);
    pageNumbers.map(number => {
      let classes = this.state.current_page === number ? styles.active : '';    
      return (
        <span key={number} className={classes} onClick={() => this.props.fetchPosts(number)}>{number}</span>
      );
      });
  } */
  
  render() {  
    console.log("this.props.total: " + this.state.total);
    let pageNumbers = [];
    for(let i = 1; i <= this.state.total/5 + 1; i++)    
      pageNumbers.push(i);
    const renderPage = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? styles.active : '';    
      return (        
        <span key={number} className={classes} onClick={() => {          
          console.log(number);
          this.fetchPosts(number);             
        }}>{number}</span>
      );  
      });    
    //const postItems = this.props.posts.map(post => (      
    const postItems = this.state.posts.map(post => (      
      <div key={post.id} className="col-md-8 col-md-5 m-1">        
      <Card>
        <CardImg top src={post.image} alt={post.username} />                 
          <CardBody>
          <Button outline color="warning" onClick={() =>{          
          if(post.like === null){            
            console.log(post.like);
            this.props.postLike(post.id, localStorage.username + ", ");
          } else if(post.like.includes(localStorage.username)) {
            console.log('Already favorite'); 
          } else {            
            this.props.postLike(post.id, post.like + localStorage.username + ", ");            
          }
        }
          }>
              { post.like.includes(localStorage.username) ?
                  <span className="fa fa-heart"></span>
                  :  
                  <span className="fa fa-heart-o"></span>
              }
          </Button>          
            <CardTitle>{post.username}</CardTitle>
            <CardText>{post.date}</CardText>
            <FetchComments comments={post.comments} id={post.id} postComment={this.props.postComment} ></FetchComments>            
            {this.RenderDel(post.username, post.id)}              
            {/* <FetchComments comments={post.comments} /> */}
          {/* <CommentForm id={post.id} postComment={this.props.postComment} />       */}
        </CardBody>        
      </Card>
      
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
        <div className={styles.pagination}>          
          {renderPage}        
        </div>        
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  postLike: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,  
  deletePost: PropTypes.func.isRequired, 
  total: PropTypes.number, 
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  total: state.posts.total  
});

export default connect(
  mapStateToProps,
  { fetchPosts, postLike, postComment, deletePost }
)(Posts);
