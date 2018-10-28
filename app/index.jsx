import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./app.css";
import App from "../components/app.jsx";

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById("app")
);