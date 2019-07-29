import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postLike, postComment, deletePost } from "../actions/postActions";
import { Row, Card, CardImg, CardText, CardBody, CardTitle, Button} from 'reactstrap';
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
      })}      
    );
  }
  
  componentWillMount() {  
    this.fetchPosts(1);    
  }  
  
  RenderDel(username, id) {
    if (username === localStorage.username) {
      return (
        <Button className="align-self-end" color="danger" outline onClick={() => {                        
          if(window.confirm('Delete the item?'))
            {
              this.props.deletePost(id);
              window.location.reload(); 
            }        
        }}>Delete</Button>
      )
    }
  }

    render() {          
    let pageNumbers = [];
    for(let i = 1; i <= this.state.total/5 + 1; i++)    
      pageNumbers.push(i);
    const renderPage = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? styles.active : '';    
      return (        
        <span key={number} className={classes} onClick={() => {                    
          this.fetchPosts(number);             
        }}>{number}</span>
      );  
      });        
    const postItems = this.state.posts.map(post => (      
      <div key={post.id} className="col-md-8 col-md-5 m-1">        
      <Card>
        <CardImg top src={post.image} alt={post.username} />                         
          <CardBody>           
              <Row className="justify-content-between" style={{margin:"2px"}}>
                <Button outline className="align-self-start" color="warning" onClick={() =>{          
                  if ( localStorage.username === "" || localStorage.username === undefined){                    
                    alert("Login firset");                
                  } else {
                    if(post.like === null){                        
                      this.props.postLike(post.id, localStorage.username + ", ");
                      //this.forceUpdate();
                      window.location.reload(); 
                    } else if(post.like.includes(localStorage.username)) {
                      alert('Already favorite'); 
                    } else {            
                      this.props.postLike(post.id, post.like + localStorage.username + ", ");            
                      //this.forceUpdate();
                      window.location.reload(); 
                    }
                  }
                }}>
                  { post.like.includes(localStorage.username) && localStorage.username !== undefined ?
                        <span className="fa fa-heart"></span>
                        :  
                        <span className="fa fa-heart-o"></span>
                    }
              </Button>                                                          
              {this.RenderDel(post.username, post.id)}                
            </Row>                      
            <FetchComments comments={post.comments} id={post.id} postComment={this.props.postComment} ></FetchComments>            
          <CardTitle>{post.username}</CardTitle>
          <CardText>{post.date}</CardText>
        </CardBody>        
      </Card>
      
      </div>
    ));
    return (
      <div style={{margin:"10px"}}>
        <h1>Gallery</h1>        
        {postItems}               
        <div className={styles.pagination}>          
          {renderPage}        
          <br/>
        </div>        
      </div>
    );
  }
}

Posts.propTypes = {  
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
  { postLike, postComment, deletePost }
)(Posts);
