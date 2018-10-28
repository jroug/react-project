import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HeaderWidget from "../components/header.jsx";

const App = () => {
    return (
        <div className="App">
          <HeaderWidget />
        </div>
    );
  }

export default App;