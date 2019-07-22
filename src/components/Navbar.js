import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { baseUrl } from "../actions/baseUrl";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Label
} from "reactstrap";
const wp = require('whirlpool-js');

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isSignupOpen: false,
      username: "",
      token: "",
      notify: true
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);        
    this.handleFroget = this.handleForget.bind(this);        
    //this.handleEditinfo = this.handleEditinfo.binf(this);
  }

  componentWillMount() {
    this.setState({
      username: localStorage.username
    })
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  toggleSignup() {
    this.setState({ isSignupOpen: !this.state.isSignupOpen });
  }  

  handleForget() {    
    let email = prompt("Please enter your email to get the reset email");    
    if (email != null) {
      fetch(baseUrl + "resetpass/" + encodeURI(email), {method: "POST"})
      .then(response => response.json())
      .then(response => {                
        console.log(response);      
      })
      .catch(error => console.log(error));
      alert("Check your email to see your temporal password");
    }
  }

  handleLogin(event) {
    fetch(baseUrl + "verify/" + this.username.value)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response === true) {
          fetch(baseUrl + "auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: this.username.value,
              password: wp.encSync(this.password.value, 'hex')
            })
          })
            .then(response => response.json())
            .then(response => {
              if (response.access_token) {
                this.toggleModal();
                this.setState({
                  username: this.username.value,
                  token: response.access_token,                  
                });
                localStorage.username = this.username.value;                
                localStorage.token = response.access_token;
                window.location.reload();
                alert(`Welcome, ${this.username.value}`)
              } else if (response.status_code === 401) {
                alert("Invalid Cridential");
              } else {
                console.log(response.description);
              }
            })
            .catch(error => console.log(error));
        } else if (response.message === "User does not exist"){
          alert("User does not exist");
        } else if (response.status_code === 401) {
          alert("Invalid Cridential");
        } else if (response === false) {
          alert("You need to verify your email fisrt.")
        }
      }) 
      .catch(error => console.log(error));
    event.preventDefault();
  }
  
  /* handleEditinfo(event) {

  } */


  handleSignup(event) {    
    fetch(baseUrl + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.username.value,        
        password: wp.encSync(this.password.value, 'hex'),
        email: this.email.value
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "A username already exists") {
          alert("A username already exists");
        } else if (response.message === "User created successfully") {
          fetch(baseUrl + "verify_mail/" + this.username.value);
          alert("Sined up successfully. Check your email to verify your account");
          this.toggleSignup();
        }
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));
    event.preventDefault();
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.username = "";
    this.setState({ username: "" });
    window.location.reload();
  }

  render() {
    const isLoggedIn = this.state.username !== "";    
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">                    
        <div className="row align-items-center">          
            <Link to="/" className="ml-5 nav-link">list of photoes</Link>          
            <Link style={{marginRight:"100px"}} to="/camera" className="ml-5 nav-link">taking photo</Link>          
        </div>
{/*         <div className="align-items-center">
          <div className="ml-5">
            <Link to="/" className="nav-link">list of photoes</Link>
          </div>
          <div className="ml-5">
            <Link to="/camera" className="nav-link">
              taking photo
            </Link>
          </div>
        </div>         */}
          {isLoggedIn ? (          
            <div>
            <Button onClick={this.handleLogout} style={{ margin: "10px" }}>
              Log Out
            </Button>
            <Link to="/editinfo" className="ml-auto">
              <Button>                  
                Edit user info
              </Button>
            </Link>            
            </div>            
        ) : (
          <div>
            <Button
              onClick={this.toggleModal}
              color="success"
              style={{ margin: "10px" }}
            >
              Log In
            </Button>
            <Button onClick={this.toggleSignup} color="warning">
              Signup
            </Button>
          </div>
        )}        
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Login</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleLogin}>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    innerRef={input => (this.username = input)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    innerRef={input => (this.password = input)}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                  />
                </FormGroup> */}
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="remember"
                      innerRef={input => (this.remember = input)}
                    />
                    Remember me
                  </Label>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Login
                </Button>                
              </Form>
              <Button onClick={this.handleForget}>Did you forget your info?</Button>            
          </ModalBody>
          </Modal>
          <Modal isOpen={this.state.isSignupOpen} toggle={this.toggleSignup}>
          <ModalHeader>Signup</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>              
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  innerRef={input => (this.password = input)}
                  required
                />
                <FormFeedback>
                  Must contain at least one number and one uppercase and
                  lowercase letter, and at least 8 or more characters
                </FormFeedback>
                <FormText>
                  Must contain at least one number and one uppercase and
                  lowercase letter, and at least 8 or more characters
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  innerRef={input => (this.email = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>              
            </Form>            
          </ModalBody>
        </Modal>        
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link{
    color:var(--mainWhite)!important
    font-size:1.3rem;
    text-transform:capitalize;    
  }
`;