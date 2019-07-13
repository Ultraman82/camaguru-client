import React from "react";
import logo from "./logo.png";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "./components/Post";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import WebcamCapture from "./components/Webcam";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />        
            <WebcamCapture />
            <Register />
            <hr />
            <Posts />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
