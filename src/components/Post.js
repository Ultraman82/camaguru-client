import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts, postLike, postComment } from "../actions/postActions";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Label,
  Modal, ModalHeader, ModalBody, Button, Row, Col, Form, FormGroup, Input, FormText } from 'reactstrap';
import FetchComments from './FetchComments';
 
/*   class CommentForm extends Component{
    constructor(props) {
        super(props);    
        
        this.state = {         
          comment: '', 
          isModalOpen: false          
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    toggleModal () {
    this.setState({            
        isModalOpen: !this.state.isModalOpen
        });          
    }    
    onSubmit(e) {
      //console.log(this.props.id, localStorage.username + " : " +   this.state.comment);
      e.preventDefault();  
      this.props.postComment(this.props.id, localStorage.username + " : " +   this.state.comment);
      this.toggleModal();    
    }

    render(){
        return(
            <div>
                <Row className="form-group">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit a comment</Button>                
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader >Comment</ModalHeader>
                      <ModalBody>
                      <form onSubmit={this.onSubmit}>                    
                        <div>                          
                          <textarea
                            name="comment"
                            onChange={this.onChange}
                            value={this.state.body}
                          />
                        </div>      
                        <button type="submit">Submit</button>
                      </form>
                      </ModalBody>
                </Modal>
            </div>
        );
    }
} */ 


class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();        
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newComment) {
      this.props.posts.unshift(nextProps.newComment);
    }
  } 
  
  render() {        
    const postItems = this.props.posts.map(post => (      
      <div key={post.id} className="col-md-8 col-md-5 m-1">        
      <Card>
        <CardImg top src={post.image} alt={post.username} />         
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
                  <span outline className="fa fa-heart"></span>
                  :  
                  <span className="fa fa-heart-o"></span>
              }
          </Button>          
          <CardBody>
            <CardTitle>{post.username}</CardTitle>
            <CardText>{post.date}</CardText>
            <FetchComments comments={post.comments} id={post.id} postComment={this.props.postComment} ></FetchComments>
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
      </div>
    );
  }
}



Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  postLike: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,  
};

const mapStateToProps = state => ({
  posts: state.posts.items  
});

export default connect(
  mapStateToProps,
  { fetchPosts, postLike, postComment }
)(Posts);
