import "./App.css";
import "semantic-ui-css/semantic.min.css";

import React from "react";

import { Router, Link } from "@reach/router";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Tours from "./components/Tours";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Home path="/" />
        <Tours path="/tours" />
      </Router>
    </div>
  );
}

export default App;
