import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user, toggleModal } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="w-30-l w-50-m w-100-ns bg-white br3 pa3 pa4-ns ba b--black-10">
          <div className="tc">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 pa2 ba b--black-10 h3 w3 dropbtn"
              alt="avatar"
            />
            <h1 className="f3 black">{this.state.name}</h1>
            <h3 className="f5 black">Images Submitted: {user.entries}</h3>
            <p className="f5 black">
              Member Since: {new Date(user.joined).toLocaleDateString()}
            </p>
          </div>
          <hr className="mw3 mb3 bb bw1 b--black-10" />
          <div className="mb3 w-100">
            <label className="mv2 fw6 black db left" htmlFor="user-name">
              Username:{" "}
            </label>
            <input
              onChange={this.onFormChange}
              type="text"
              className="pa2 ba w-100"
              placeholder="Yolanda Masvidal"
              value={this.state.name}
              name="user-name"
              id="name"
            />
          </div>
          <div className="mb3 w-100">
            <label className="mv2 fw6 black db left" htmlFor="user-age">
              Age:{" "}
            </label>
            <input
              onChange={this.onFormChange}
              type="text"
              className="pa2 ba w-100"
              placeholder="19"
              value={this.state.age}
              name="user-age"
              id="age"
            />
          </div>
          <div className="mb3 w-100">
            <label className="mv2 fw6 black db left" htmlFor="user-pet">
              Pet:{" "}
            </label>
            <input
              onChange={this.onFormChange}
              type="text"
              className="pa2 ba w-100"
              placeholder="Dragon"
              value={this.state.pet}
              name="user-pet"
              id="pet"
            />
          </div>
          <div className="tc">
            <a
              className="mr1 f5 link dim br-pill ph4 pv2 mb2 dib white bg-light-purple"
              href="#0"
              onClick={() => this.onProfileUpdate({ name, age, pet })}
            >
              Save
            </a>
            <a
              class="ml1 f6 link dim br-pill ba bw1 ph4 pv2 mb2 dib mid-gray"
              href="#0"
              onClick={toggleModal}
            >
              Cancel
            </a>
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
