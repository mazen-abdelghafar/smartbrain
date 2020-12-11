import React, { Component } from "react";
import "./Signup.css";

class Signun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpEmail: "",
      signUpPassword: "",
      signUpName: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ signUpName: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ signUpEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signUpPassword: event.target.value });
  };

  onSubmitSignUp = () => {
    fetch("http://localhost:3001/signup", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.signUpName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="articleSignup center br3 pa2 mv3 ba b--black-10">
        <div className="SignupBg"></div>
        <main className="mainSignup pa4">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent grow hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent grow hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent grow hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
            <input type="checkbox" /> Remember me
          </label> */}
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignUp}
                className="ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign up"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("signin")}
                className="f6 link dim pointer white db"
              >
                Sign in
              </p>
              {/* <a href="#0" className="f6 link dim black db">
            Forgot your password?
          </a> */}
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signun;
