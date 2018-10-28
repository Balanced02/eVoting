import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import { startLogin } from "../../actions/auth";
import { showError } from "../../actions/feedback";
import { message, Icon } from "antd";
import { getBirthdays } from "../../actions/birthdays";
class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    let { username, password } = this.state;
    let { dispatch, loading } = this.props;
    const login = () => {
      if (username && password) {
        console.log("Logging in");
        dispatch(startLogin({ username, password }));
      } else {
        dispatch(showError("Please provide your Username and Password"));
      }
    };

    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input
                  id="inputUserName"
                  size="large"
                  placeholder="Username"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  onChange={({ target: { value } }) =>
                    this.setState({ username: value })
                  }
                  onKeyPress={({ key }) => (key === "Enter" ? login() : null)}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  id="inpuPassword"
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={({ target: { value } }) =>
                    this.setState({ password: value })
                  }
                  onKeyPress={({ key }) => (key === "Enter" ? login() : null)}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={login}>
                  {loading ? (
                    <Icon
                      type="loading"
                      style={{ color: "rgba(255,255,255,255)" }}
                    />
                  ) : (
                    <i />
                  )}
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/voterLogin">
                <Button type="success" >
                  Voter Login
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.feedback.loading
  };
};

export default connect(mapStateToProps)(SignIn);
