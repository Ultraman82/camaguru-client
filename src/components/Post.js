import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts, createPost } from "../actions/postActions";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Label,
  Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
    /* postFavorite(dish._id) */
  } 
  
  render() {        
    const postItems = this.props.posts.map(post => (      
      <div key={post.id} className="col-md-8 col-md-5 m-1">        
      <Card>
        <CardImg top src={post.image} alt={post.username} /> 
        
        <Button outline color="warning" onClick={() => post['like'].includes(localStorage.username) ? console.log('Already favorite') : this.props.fetchPosts(post.id, localStorage.username)}>        
              {post.like.includes(localStorage.username) ?
                  <span outline className="fa fa-heart"></span>
                  : 
                  <span className="fa fa-heart-o"></span>
              }
          </Button>          
          <CardBody>
            <CardTitle>{post.username}</CardTitle>
            <CardText>{post.date}</CardText>
        </CardBody>
        
      </Card>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  createPost: PropTypes.func.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(
  mapStateToProps,
  { fetchPosts, createPost }
)(Posts);
