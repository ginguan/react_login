import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vprofilePic = (value) => {
  if (value.length ==0) {
    return (
      <div className="alert alert-danger" role="alert">
        A profile pic has to upload
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePic = this.onChangePic.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      profilePic:"https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account.jpg",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
    //document.getElementById("frame-text").innerHTML= typeof(e.target.value);
  }
  // handleChange(e){
  //   this.setState({
  //     //profilePic: URL.createObjectURL(e.target.files[0])
  //     profilePic:e.target.files[0]
  //   })
  // }
    //document.getElementById("frame-text").innerHTML= typeof(e.target.value);
  
//   showPic(e){
// URL.createObjectURL(e.target.files[0])
//     document.getElementById("frame").src =URL.createObjectURL(e.target.files[0]);  
//     document.getElementById("frame-text").innerHTML= (e.target.files[0],typeof(e.target.files[0]));  
//   }

  onChangePic(e){
    const data = new FormData();
    data.append('file',e.target.files[0]);
    data.append('upload_preset','userProfile');
    data.append("cloud_name","dvqqs4tl5");
    //https://cloudinary.com/ image cloud
    //CLOUDINARY_URL=cloudinary://329668951359153:y_WmEk_Gfq8sYQNjkWhofw4e2Tk@dvqqs4tl5
    fetch("https://api.cloudinary.com/v1_1/dvqqs4tl5/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json()).
    then(data=>{
      this.setState({
        //profilePic: URL.createObjectURL(e.target.files[0])
        profilePic:data.url
      })
        console.log(data);
        console.log(typeof(data.url))
    }).catch(err=>{
        console.log("error while uploading");
    })
}


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.email, this.state.password,this.state.profilePic)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img id= "frame"
            src={this.state.profilePic}
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profilePic">Profile Picture</label>
                  <Input
                    type="file"
                    className="form-control"
                    name="profilePic"
                    //value={this.state.profilePic}
                    onChange={this.onChangePic}
                    validations={[required, vprofilePic]}
                  />
                   {/* <img alt="Pic Space" id="frame2" src={this.state.profilePic} width="30%" height="30%"/>*/}
                  <p id="frame-text"></p>  
                </div>

                <div className="form-group">
                  <button className="btn btn-success btn-block" style={{marginTop:"50px"}}>Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);