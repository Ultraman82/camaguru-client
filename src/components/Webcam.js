import React from "react";
import Webcam from "react-webcam";
import base64Img from "base64-img";
/* export default class Component extends React.Component {
  render() {
    return <Webcam />;
  }
} */
export default class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    /* let added = this.state.images.concat(this.webcam.getScreenshot()); */
    this.setState({
      images: [this.webcam.getScreenshot(), ...this.state.images],
      icon: 0
    });
    /* this.setState({
      images: added
    }); */
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    let images = this.state.images;
    let pic = "";
    let set = {};
    if (this.state.icon == 0) {
      pic = "images/trump.png";
      set = {
        width: "200px",
        height: "200px",
        position: "absolute",
        top: "0",
        left: "0px"
      };
    } else if (this.state.icon == 1) {
      pic = "images/bold.png";
      set = {
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "0",
        left: "0px"
      };
    } else {
      pic = "images/bold.png";
      set = {
        width: "20px",
        height: "20px",
        position: "absolute",
        top: "0",
        left: "0px"
      };
    }

    const snapshots = images.map(image => {
      return (
        <div key={images.indexOf(image)} className="row">
          <div style={{ position: "relative", left: "0", top: "0" }}>
            <img
              src={image}
              style={{ position: "relative", top: "0", left: "0" }}
              alt=""
            />
            <img src={pic} style={set} alt="" />
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-6">
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          {/* <img
            src="images/trump.png"
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              top: "70px",
              left: "13px"
            }}
            alt=""
          /> */}
          <div>
            <p>Select a maintenance drone:</p>
            <div>
              <input
                type="radio"
                name="drone"
                onClick={() => this.setState({ icon: 0 })}
                checked
              />
              <label for="trump">Trump</label>
            </div>
            <div>
              <input
                type="radio"
                name="drone"
                onClick={() => this.setState({ icon: 1 })}
              />
              <label for="bold">Bold</label>
            </div>
            <div>
              <input
                type="radio"
                name="drone"
                onClick={() => this.setState({ icon: 2 })}
              />
              <label for="funny">Funny</label>
            </div>
          </div>

          <button onClick={this.capture}>Capture photo</button>
          <div style={{ position: "relative", left: "0", top: "0" }}>
            <img
              src={this.state.images[0]}
              style={{ position: "relative", top: "0", left: "0" }}
              alt=""
            />
            <img
              src={pic}
              style={{
                width: "200px",
                height: "200px",
                position: "absolute",
                top: "0",
                left: "0"
              }}
              alt=""
            />
          </div>
        </div>
        <div className="col-6">{snapshots}</div>
      </div>
    );
  }
}
