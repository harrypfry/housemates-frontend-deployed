import React, { Component } from "react";

import { Form, Button } from "semantic-ui-react";

class SignInForm extends Component {
  state = { username: "", password: "", submitButtonDisabled: false };

  handleInput = (field, value) => {
    this.setState({ [field]: value });
  };

  logInUser = e => {
    const { username, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(username + "@housemates.com", password)
      .catch(err => {
        console.log(err);
      });

    e.preventDefault();
  };

  render() {
    return (
      <>
        <Form onSubmit={this.logInUser}>
          <Form.Input
            label="Username"
            placeholder="Username..."
            type="text"
            onChange={e => this.handleInput("username", e.target.value)}
            value={this.state.username}
          />
          <Form.Input
            label="Password"
            placeholder="Password..."
            type="password"
            onChange={e => this.handleInput("password", e.target.value)}
            value={this.state.password}
          />
          <div className="submit-button-container">
            <Button disabled={this.state.submitButtonDisabled} type="submit">
              Sign In
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default SignInForm;
