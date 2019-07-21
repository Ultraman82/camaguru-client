import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { baseUrl } from "../actions/baseUrl";
const wp = require('whirlpool-js');

export default class EditDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

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
        console.log(response);
        this.setState({
          ...response
        });        
        console.log(this.state);
      })
      .catch(error => console.log("error:", error));
      
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
    /* this.editItem(); */
    console.log(this.state);
    //console.log("save cart parse : ", JSON.parse(this.state.cart.toString()));
    //console.log(this.state.username);
     fetch(`${baseUrl}user/${this.state.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
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