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
import { Icon } from "antd";
import { history } from '../../index'

class VerifyOTP extends Component {
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
      history.push('/securityCheck')
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
                  placeholder="Enter OTP"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  onChange={({ target: { value } }) =>
                    this.setState({ username: value })
                  }
                  onKeyPress={({ key }) => (key === "Enter" ? login() : null)}
                />
              </div>
              <div className="isoCenterComponent" >
                <Button type="primary" onClick={login}>
                  {loading ? (
                    <Icon
                      type="loading"
                      style={{ color: "rgba(255,255,255,255)" }}
                    />
                  ) : (
                    <i />
                  )}
                  Verify OTP
                </Button>
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

export default connect(mapStateToProps)(VerifyOTP);
