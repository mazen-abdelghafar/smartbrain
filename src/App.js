import React, { Component, Fragment } from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import BgParticles from "./components/BgParticles/BgParticles";

import "./App.css";

const initialState = {
  input: "",
  imageUrl: "",
  getImage: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  // route: "home",
  // isSignedIn: true,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    age: "",
    pet: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("https://peaceful-refuge-50521.herokuapp.com/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data && data.id) {
            fetch(
              `https://peaceful-refuge-50521.herokuapp.com/profile/${data.id}`,
              {
                method: "get",
                headers: {
                  "content-type": "application/json",
                  authorization: token,
                },
              }
            )
              .then((resp) => resp.json())
              .then((user) => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      let box = [];
      for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
        const boxArea =
          data.outputs[0].data.regions[i].region_info.bounding_box;
        box.push({
          leftCol: boxArea.left_col * width,
          topRow: boxArea.top_row * height,
          rightCol: width - boxArea.right_col * width,
          bottomRow: height - boxArea.bottom_row * height,
        });
      }
      return box;
    }
    return;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }, () => {
      fetch("https://peaceful-refuge-50521.herokuapp.com/imageurl", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          this.displayFaceBox(this.calculateFaceLocation(response));

          fetch("https://peaceful-refuge-50521.herokuapp.com/image", {
            method: "put",
            headers: {
              "content-type": "application/json",
              authorization: window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) =>
              this.setState(Object.assign(this.state.user, { entries: count }))
            )
            .catch(console.log);
        })
        .catch((err) => console.log(err));
    });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const { isProfileOpen, user } = this.state;

    return (
      <div className="App">
        <BgParticles />
        <Navigation
          route={this.state.route}
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={user}
              loadUser={this.loadUser}
            />
          </Modal>
        )}
        <div className="body-content">
          {this.state.route === "home" ? (
            <Fragment>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                imageUrl={this.state.imageUrl}
                box={this.state.box}
              />
            </Fragment>
          ) : this.state.route === "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : this.state.route === "signout" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Signup
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;

// new syntax

// app.models
//   .initModel({
//     // id: Clarifai.GENERAL_MODEL,
//     id: "d02b4508df58432fbb84e800597b8959",
//     // version: "aa7f35c01e0642fda5cf400f543e7c40",
//   })
//   .then((generalModel) => {
//     return generalModel.predict(this.state.input);
//   })
//   .then((response) => {
//     const concepts = response["outputs"][0]["data"]["concepts"];
//     //console.log(response);
//   });
