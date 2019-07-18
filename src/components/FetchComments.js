import React, { Component } from 'react';
import {   
  Modal, ModalHeader, ModalBody, Button, Row } from 'reactstrap';


class FetchComments extends Component{
  constructor(props) {
      super(props);    
      
      this.state = {         
        comments: [],
        isModalOpen: false          
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    //const answer = this.props.comments.split(',');
    if(this.props.comments)
      this.setState({
      comments: this.props.comments.split(', ')
    })
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
    let newComment = localStorage.username + " : " +   this.state.comment    
    this.props.postComment(this.props.id, newComment);
    this.setState({
      comments: this.state.comments.concat(newComment)
    })
    this.toggleModal();    
    e.preventDefault();  
  }

  render(){
    const postComments = this.state.comments.map(comment => (
      <p key={this.state.comments.indexOf(comment)} >
        {comment}
      </p>));
      return(
          <div>
            <div>
            {postComments}
            </div>

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
}
export default FetchComments;