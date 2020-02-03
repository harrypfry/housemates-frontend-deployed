import React, { Component } from "react";

import { Menu } from "semantic-ui-react";
import { navigate } from "@reach/router";

class Navbar extends Component {
  state = { activeItem: "home" };

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
    const { activeItem } = this.state;

    return (
      <Menu inverted color="blue">
        <Menu.Item className="nav-title">Travel Melbourne</Menu.Item>
        <Menu.Item
          className="nav-item"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          className="nav-item"
          name="tours"
          active={activeItem === "tours"}
          onClick={this.handleItemClick}
        >
          Tours
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item className="nav-item" onClick={this.handleItemClick}>
            Register
          </Menu.Item>
          <Menu.Item className="nav-item" onClick={this.handleItemClick}>
            Sign In
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
