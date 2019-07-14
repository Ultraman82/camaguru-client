import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { baseUrl } from "../actions/baseUrl";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
  //FormFeedback,FormText
} from "reactstrap";
const wp = require('whirlpool-js');

//import nodemailer from "nodemailer";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isSignupOpen: false,
      username: "",
      token: ""
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleUnsign = this.handleUnsign.bind(this);
    //  this.sendMail = this.sendMail.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  toggleSignup() {
    this.setState({ isSignupOpen: !this.state.isSignupOpen });
  }
  /* sendMail() {
    console.log("sendingEmaul");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
   
      }
    });
    var mailOptions = {
      from: "exelcior99@gmail.com",
      to: "lomupor@quickemail.info",
      subject: "Sending Email using Node.js",
      text: "That was easy!"
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    event.preventDefault();
  } */

  handleLogin(event) {
    fetch(baseUrl + "verify/" + this.username.value)
      .then(response => response.json())
      .then(response => {
        if (response) {
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
                  token: response.access_token
                });
                localStorage.username = this.username.value;
                localStorage.token = response.access_token;
              } else if (response.status_code === 401) {
                alert("Invalid Cridential");
              } else {
                console.log(response.description);
              }
            })
            .catch(error => console.log(error));
        }
        else{
          alert("You need to verify your email fisrt.")
        }
      }) 
      .catch(error => console.log(error));
    event.preventDefault();
  }

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

  handleUnsign(event) {
    fetch(`${baseUrl}user/${this.state.username}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(response => {
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));

    event.preventDefault();
  }

  handleLogout() {
    localStorage.removeItem("token");
    //localStorage.removeItem("username");
    localStorage.username = "";
    this.setState({ username: "" });
  }

  render() {
    const isLoggedIn = this.state.username !== "";
    const isAdmin = localStorage.username === "edgar";
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        {/* <Link to="/">
            <img src={logo} alt="store" className="navbar-brand" />
            </Link> */}
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Homt
            </Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div>
            <Button onClick={this.handleLogout} style={{ margin: "10px" }}>
              Log Out
            </Button>
            <Button onClick={this.handleUnsign} color="danger">
              Unsign
            </Button>
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

        {isAdmin ? (
          <div>
            <Link to="/manageusers" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-user-edit" />
                </span>
                Edit Users
              </ButtonContainer>
            </Link>
            <Link to="/manageitems" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-edit" />
                </span>
                Edit Items
              </ButtonContainer>
            </Link>
            <Link to="/manageorders" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-edit" />
                </span>
                Check Orders
              </ButtonContainer>
            </Link>
          </div>
        ) : (
          <Link to="/cart" className="ml-auto">
            <ButtonContainer>
              <span className="mr-2">
                <i className="fas fa-cart-plus" />
              </span>
              my cart
            </ButtonContainer>
          </Link>
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
              </FormGroup> */}
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
