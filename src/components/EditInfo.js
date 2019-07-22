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
      username: "",
      email: "",
      password: "",
      notify: null,
      verified: null
    };
  }

  componentWillMount() {        
    fetch(`${baseUrl}user/${localStorage.username}`)
      .then(response => response.json())
      .then(response => {        
        this.setState({
          ...response, password:""
        });                
      })
      .catch(error => console.log("error:", error));      
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

  render() {    
    return (
      <div className="container py-5">
        <div className="row">
          <div className="co-10 mx-auto col-md-6 my-3">            
          </div>
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
                <label>password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>             
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