import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/registerAction";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    this.props.register(user);
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="">Username:</label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              vnalue={this.state.title}
            />
          </div>
          <div>
            <label htmlFor="">Password:</label>
            <br />
            <input
              type="password"
              name="body"
              onChange={this.onChange}
              value={this.state.body}
            />
          </div>
          <div>
            <label htmlFor="">Email:</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired
};
export default connect(
  null,
  { register }
)(Register);
