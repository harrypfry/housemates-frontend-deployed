import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React, { Component } from "react";

import { Router } from "@reach/router";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Tours from "./components/Tours";

import { withFirebase } from "./components/Firebase/";

class App extends Component {
  state = { authUser: null };

  changeActiveItem = (e, item) => {
    e.preventDefault();

    this.setState({ activeItem: item });
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser =>
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;
    return (
      <div>
        <Navbar authUser={authUser} />
        <Router>
          <Home path="/" />
          <Tours path="/tours" />
        </Router>
      </div>
    );
  }
}

export default withFirebase(App);
