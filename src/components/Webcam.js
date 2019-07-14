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
    this.state = { images: [], icon:0 };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    /* let added = this.state.images.concat(this.webcam.getScreenshot()); */
    this.setState({
      images: [{image:this.webcam.getScreenshot(), icon:this.state.icon}, ...this.state.images],      
    });
    /* this.setState({
      images: added
    }); */
  };

  renderSelect = () => {    
    return(
      <div>
    <p>Select a maintenance drone:</p>
    <div>
      <input
        type="radio"
        name="drone"
        id="trump"
        value="trump"
        onClick={() => this.setState({ icon: 0 })}
        checked
      />
      <label for="trump">Trump</label>
    </div>
    <div>
      <input
        type="radio"
        name="drone"
        id="bold"
        value="bold"
        onClick={() => this.setState({ icon: 1 })}
      />
      <label for="bold">Bold</label>
    </div>
    <div>
      <input
        type="radio"
        name="drone"
        value="funny"
        id="funny"                
        onClick={() => this.setState({ icon: 2 })}
      />
      <label for="funny">Funny</label>
    </div>
    </div>      
    )
  };

  renderPic = (icon) => {
    let pic = "";
    let set = {};
    if (icon == 0) {
      pic = "images/trump.png";
      set = {
        width: "200px",
        height: "200px",
        position: "absolute",
        top: "0",
        left: "0px"
      };
    } else if (icon == 1) {
      pic = "images/bold.png";
      set = {
        width: "150px",
        height: "150px",
        position: "absolute",
        top: "0",
        left: "0px"
      };
    } else {
      pic = "images/42.png";
      set = {
        width: "200px",
        height: "10px",
        position: "absolute",
        top: "120px",
        left: "100px"
      };
    }
    return(
      <img src={pic} style={set} alt="" />
    )
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    let images = this.state.images;
    

    const snapshots = images.map(image => {      
      return (        
        <div key={images.indexOf(image)} className="row" style={{margin:"20px"}}>
          <div style={{ position: "relative", left: "0", top: "0" }}>
            <img
              src={image.image}
              style={{ position: "relative", top: "0", left: "0" }}
              alt=""
            />
            {this.renderPic(image.icon)}            
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-6" style={{ position: "relative", left: "0", top: "0", margin:"50px" }}>
          <Webcam
            audio={false}
            height={500}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
            style={{ position: "relative", bottom: "110px", right: "20px"}}
          />                    
            {this.renderPic(this.state.icon)}          
            {this.renderSelect()}
            <button onClick={this.capture}>Capture photo</button>
        </div>        
        <div className="col-6">{snapshots}</div>
      </div>
    );
  }
}
