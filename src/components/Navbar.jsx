import React, { Component } from "react";

import { Menu, TransitionablePortal, Segment } from "semantic-ui-react";
import { navigate } from "@reach/router";

import { FirebaseContext } from "./Firebase";
import SignInForm from "./SignInForm";
import NewUserForm from "./NewUserForm";
import UserInfo from "./UserInfo";

class Navbar extends Component {
  state = {
    activeItem: "home",
    registerPortalOpen: false,
    loginPortalOpen: false,
    userPortalOpen: false
  };

  toggleRegisterPortal = () => {
    this.setState(currentState => {
      return {
        registerPortalOpen: !currentState.registerPortalOpen,
        loginPortalOpen: false
      };
    });
  };

  toggleLoginPortal = () => {
    this.setState(currentState => {
      return {
        loginPortalOpen: !currentState.loginPortalOpen,
        registerPortalOpen: false
      };
    });
  };

  toggleUserPortal = () => {
    this.setState(currentState => {
      return { userPortalOpen: !currentState.userPortalOpen };
    });
  };

  handleItemClick = (e, { name }) => {
    switch (name) {
      case "home":
        navigate("/");
        break;
      case "tours":
        navigate("/tours");
        break;
      default:
    }
    this.setState({ activeItem: name });
  };

  render() {
    return (
      <Menu inverted color="blue">
        <Menu.Item className="nav-title">Travel Melbourne</Menu.Item>
        <Menu.Item
          className="nav-item"
          name="home"
          active={this.state.activeItem === "home"}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          className="nav-item"
          name="tours"
          active={this.state.activeItem === "tours"}
          onClick={this.handleItemClick}
        >
          Tours
        </Menu.Item>
        <Menu.Menu position="right">
          <TransitionablePortal open={this.state.registerPortalOpen}>
            <Segment
              className="register-segment"
              color="blue"
              style={{
                left: "80%",
                position: "fixed",
                top: "10%",
                zIndex: 1000
              }}
            >
              <FirebaseContext.Consumer>
                {firebase => (
                  <NewUserForm
                    firebase={firebase}
                    toggleRegisterPortal={this.toggleRegisterPortal}
                  />
                )}
              </FirebaseContext.Consumer>
            </Segment>
          </TransitionablePortal>
          <TransitionablePortal open={this.state.loginPortalOpen}>
            <Segment
              className="register-segment"
              color="blue"
              style={{
                left: "82%",
                position: "fixed",
                top: "10%",
                zIndex: 1000
              }}
            >
              <FirebaseContext.Consumer>
                {firebase => (
                  <SignInForm
                    firebase={firebase}
                    toggleLoginPortal={this.toggleLoginPortal}
                  />
                )}
              </FirebaseContext.Consumer>
            </Segment>
          </TransitionablePortal>
          <TransitionablePortal open={this.state.userPortalOpen}>
            <Segment
              className="register-segment"
              color="blue"
              style={{
                left: "80%",
                position: "fixed",
                top: "10%",
                zIndex: 1000
              }}
            >
              <FirebaseContext.Consumer>
                {firebase => (
                  <UserInfo
                    authUser={this.props.authUser}
                    className="nav-item"
                    firebase={firebase}
                    toggleUserPortal={this.toggleUserPortal}
                  />
                )}
              </FirebaseContext.Consumer>
            </Segment>
          </TransitionablePortal>
          {this.props.authUser ? (
            <Menu.Item className="nav-item" onClick={this.toggleUserPortal}>
              {this.props.authUser.email.substring(
                0,
                this.props.authUser.email.lastIndexOf("@")
              )}
            </Menu.Item>
          ) : (
            <>
              <Menu.Item
                className="nav-item"
                onClick={this.toggleRegisterPortal}
              >
                Register
              </Menu.Item>
              <Menu.Item className="nav-item" onClick={this.toggleLoginPortal}>
                Sign In
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
