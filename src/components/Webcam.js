import React from "react";
import Webcam from "react-webcam";
import { baseUrl } from "../actions/baseUrl";
import { ButtonGroup, Button } from "reactstrap";

  export default class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: [],
      icon:0,
      mode:"cam",
      file:""
      };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  componentWillMount() {
    this.setState({username:localStorage.username})
  }

  capture = () => {    
    if (this.state.mode === "file"){
      this.setState({
        images: [...this.state.images, {image:this.state.file, icon:this.state.icon}],      
      });
    } else {
      this.setState({
        images: [...this.state.images, {image:this.webcam.getScreenshot(), icon:this.state.icon}],      
      });
    }
  };
  pushImage = (index, icon) => {
    //console.log(this.state.images[index]);
    fetch(baseUrl + "picture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorage.token
      },
      body: JSON.stringify({
        username: localStorage.username,
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
        <ButtonGroup vertical>
          <Button color="danger" onClick={() => this.setState({images: this.state.images.filter(image => index !== this.state.images.indexOf(image))})}>Delete</Button>
          <Button color="success" onClick={() => {
            if (localStorage.username)
              this.pushImage(index, icon)
            else
              alert("Log in first") 
            }
          }>Post</Button>
          
        </ButtonGroup>
        {/* <button onClick={() => this.setState({images: this.state.images.filter(image => index !== this.state.images.indexOf(image))})}>Delete Item</button>
        <button onClick={() => {
            if (localStorage.username)
              this.pushImage(index, icon)
            else
              alert("Log in first") 
            }
          }>Post Item</button> */}
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
      />
      <label htmlFor="trump">Trump</label>
    </div>
    <div>
      <input
        type="radio"
        name="drone"
        id="bold"
        value="bold"
        onClick={() => this.setState({ icon: 1 })}
      />
      <label htmlFor="bold">Bold</label>
    </div>
    <div>
      <input
        type="radio"
        name="drone"
        value="funny"
        id="funny"                
        onClick={() => this.setState({ icon: 2 })}
      />
      <label htmlFor="funny">42</label>
    </div>
    </div>      
    )
  };

  renderPic = (icon) => {
    let pic = "";
    let set = {};
    if (icon === 0) {
      pic = "images/trump.png";
      set = {        
        position: "absolute",
        top: "0",
        left: "30px"
      };
    } else if (icon === 1) {
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

  
  previewFile = (e) => {
    let file    = Array.from(e.target.files)[0]; //sames as here    
    var reader  = new FileReader();
    
    reader.onloadend = () => {      
      this.setState({
        file:reader.result
      });      
    }
    reader.readAsDataURL(file)    
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

    if(this.state.username !== ""){
      return (            
        <div className="row" style={{marginTop:"50px"}}>
          <div className="col-sm" style={{ position: "relative", left: "0", top: "0", margin:"50px" }}>
            {
              this.state.mode === "cam" ? 
              <div>
              <Webcam
              audio={false}
              height={500}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={videoConstraints}
              style={{ position: "relative", bottom: "110px", right: "15px"}}
            />             
            </div>
            : <div>
                  <img width={500} style={{marginBottom:"200px", position: "relative", right:"15px"}} src={this.state.file} alt="static_img"/>
                  <div  >File Screen</div>
                  <input type="file" onChange={this.previewFile} /><br />                  
                </div>                   
            }
              {this.renderPic(this.state.icon)}          
              {this.renderSelect()}
              <ButtonGroup>
                <Button color="success" onClick={() => this.setState({mode:"file"})} active={this.state.mode === "file"}>File</Button>
                <Button color="primary" onClick={() => this.setState({mode:"cam"})} active={this.state.mode === "cam"}>Camera</Button>                
                <Button color="warning" onClick={this.capture}>Capture</Button>                
              </ButtonGroup>
          </div>        
          <div className="col-sm">{snapshots}</div>
        </div>
      );
    } else {
      return (
        <h1>You need to log in first to take a photo</h1>
      )
    }
  }
}
