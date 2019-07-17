import React from "react";
import logo from "./logo.png";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "./components/Post";
import Navbar from "./components/Navbar";
import WebcamCapture from "./components/Webcam";
import store from "./store";

function App() {
  return (
    <BrowserRouter>    
      <Navbar /> 
      <Switch>
        <Provider store={store}>
          <Route exact path="/" component={WebcamCapture} />
          <Route exact path="/list" component={Posts} />                      
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
