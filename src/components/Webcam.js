import React from "react";
import Webcam from "react-webcam";
import { baseUrl } from "../actions/baseUrl";


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
      images: [...this.state.images, {image:this.webcam.getScreenshot(), icon:this.state.icon}],      
    });
    /* this.setState({
      images: added
    }); */
  };
  pushImage = (index, icon) => {
    fetch(baseUrl + "picture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "edgar"        ,
        image: this.state.images[index]["image"].split(',')[1],
        date: new Date(),
        icon: icon,
        like: ""
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.message === "An error occured inserting the picture.") {
          alert("An error occured inserting the picture.");
        } else if (response.message === "Success") {          
          alert("Picture was posted successfuly");          
        }
        console.log("response", response);
      })
      .catch(error => console.log("error:", error));    
  }
  
  handleDelete = (index, icon) => {        
    return(
      <div>
        <button onClick={() => this.setState({images: this.state.images.filter(image => index !== this.state.images.indexOf(image))})}>Delete Item</button>
        <button onClick={() => this.pushImage(index, icon)}>Post Item</button>
      </div>
      
    );
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
      <label for="funny">42</label>
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
        position: "absolute",
        top: "0",
        left: "30px"
      };
    } else if (icon == 1) {
      pic = "images/bold.png";
      set = {        
        position: "absolute",
        top: "0",
        left: "200px"
      };
    } else {
      pic = "images/42.png";
      set = {        
        position: "absolute",
        top: "200px",
        left: "200px"
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
        <div key={images.indexOf(image)} className="row" style={{margin:"50px"}}>
          <div style={{ position: "relative", left: "0", top: "0" }}>
            <img
              src={image.image}
              style={{ position: "relative", top: "0", left: "0" }}
              alt=""
            />
            {this.renderPic(image.icon)}            
          </div>                    
          {this.handleDelete(images.indexOf(image), image.icon)}
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-sm" style={{ position: "relative", left: "0", top: "0", margin:"50px" }}>
          <Webcam
            audio={false}
            height={500}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
            style={{ position: "relative", bottom: "110px", right: "15px"}}
          />                    
            {this.renderPic(this.state.icon)}          
            {this.renderSelect()}
            <button onClick={this.capture}>Capture photo</button>
        </div>        
        <div className="col-sm">{snapshots}</div>
      </div>
    );
  }
}
