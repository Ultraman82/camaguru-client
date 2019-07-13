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
    this.state = { image: "" };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    this.setState({
      image: this.webcam.getScreenshot()
    });
    /*     var image = this.webcam.getScreenshot()
    base64Img.img(image, 'dest', '1', function(err, filepath) {}); */
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
        <img src={this.state.image} alt="" />
      </div>
    );
  }
}
