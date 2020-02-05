import React, { Component } from "react";

import { Form, Button } from "semantic-ui-react";

class NewUserForm extends Component {
  state = {
    submitButtonDisabled: true,
    username: "",
    password: "",
    confirmPassword: ""
  };

  handleInput = (field, value) => {
    this.setState({ [field]: value }, this.checkValidity);
  };

  submitNewUser = e => {
    const { username, password } = this.state;
    this.props.toggleRegisterPortal();

    this.props.firebase
      .doCreateUserWithEmailAndPassword(username + "@housemates.com", password)
      .then()
      .catch(err => {
        console.log(err);
      });

    e.preventDefault();
  };

  checkValidity = () => {
    const { username, password, confirmPassword } = this.state;

    const usernameValid = username.length > 5;

    const passwordValid = password.length > 5;

    if (password === confirmPassword && usernameValid && passwordValid) {
      this.setState({ submitButtonDisabled: false });
    } else {
      this.setState({ submitButtonDisabled: true });
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.submitNewUser}>
          <Form.Input
            label="Create Username"
            placeholder="Create username..."
            type="text"
            onChange={e => this.handleInput("username", e.target.value)}
            error={this.state.username !== "" && this.state.username.length < 6}
            value={this.state.username}
          />
          <Form.Input
            label="Create Password"
            placeholder="Create password..."
            type="password"
            onChange={e => this.handleInput("password", e.target.value)}
            error={this.state.password !== "" && this.state.password.length < 6}
            value={this.state.password}
          />
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm password..."
            type="password"
            onChange={e => this.handleInput("confirmPassword", e.target.value)}
            error={
              this.state.confirmPassword !== "" &&
              this.state.password !== this.state.confirmPassword
            }
            value={this.state.confirmPassword}
          />
          <div className="submit-button-container">
            <Button disabled={this.state.submitButtonDisabled} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default NewUserForm;
