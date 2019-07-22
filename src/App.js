import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "./components/Post";
import Navbar from "./components/Navbar";
import EditInfo from "./components/EditInfo";
import WebcamCapture from "./components/Webcam";
import Footer from "./components/Footer"
import store from "./store";

function App() {
  return (
    <React.Fragment>
    <BrowserRouter>            
    <Navbar />
      <Switch>                    
      <Provider store={store}>      
          <Route exact path="/camera" component={WebcamCapture} />
          <Route exact path="/editinfo" component={EditInfo} />
          <Route exact path="/" component={Posts} />                                                                
      </Provider>
      </Switch>
    <Footer/>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
