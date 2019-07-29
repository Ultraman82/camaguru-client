import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";
import { baseUrl } from "../actions/baseUrl";
const wp = require('whirlpool-js');

export default class EditDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      username: undefined,
      email: "",
      password: "",
      notify: null,
      verified: null
    };
  }

  componentWillMount() {
    if(localStorage.username === "" || localStorage.username === undefined)
      alert("Log in first")
    else{
      fetch(`${baseUrl}user/${localStorage.username}`)
      .then(response => response.json())
      .then(response => {        
        this.setState({
          ...response
        })
      })
      .catch(error => console.log("error:", error));
    }
  }

  onRadioBtnClick(rSelected) {
    this.setState({ notify: rSelected });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }  

  editItem = () => {};

  onSubmit(e) {
    e.preventDefault();
    if(localStorage.username !== "" && localStorage.username !== undefined)
    {
      fetch(`${baseUrl}user/${this.state.username}`, {
        method: "PUT",
        headers: {        
          "Content-Type": "application/json",
          "Authorization": "JWT " + localStorage.token
        },
        body: JSON.stringify({
          username: this.state.username,
          password: wp.encSync(this.state.password, 'hex'),
          notify: this.state.notify,
          email: this.state.email,
          verified: this.state.verified        
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.message === "Info has successfuly updated") {
            alert("Info has successfuly updated");
          }       
        })
        .catch(error => console.log("error:", error));
    }
    else{
      alert("Login First");
    }     
  }

  render() {    
    return (
      <div className="container py-5">
        <div className="row">          
          <div className="co-10 mx-auto col-md-6 my-3">
            <h4 className="text-blue">
              <strong>
                password: <span></span>
                {this.state.password}
              </strong>
            </h4>            
            
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>              
              <div className="form-group">
                <label>password: Must contain at least one number and one uppercase and
                  lowercase letter, and at least 8 or more characters</label>
                <input
                  type="password"
                  className="form-control"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>             
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
              <ButtonGroup>
                <Button color="success" onClick={() => this.onRadioBtnClick(true)} active={this.state.rSelected === true}>On</Button>
                <Button onClick={() => this.onRadioBtnClick(false)} active={this.state.rSelected === false}>Off</Button>                
              </ButtonGroup>
              <p>Notify: {this.state.notify ? "On":"Off"}</p> 
              <div className="form-group">
                <input
                  type="submit"
                  value="Confirm"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}