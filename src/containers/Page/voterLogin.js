import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import { Icon } from "antd";
import { history } from "../../index";

class VoterLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false
    };
  }

  login = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      history.push("/verifyOTP");
    }, 2000);
  };

  render() {
    let { username, password, loading } = this.state;
    let { dispatch } = this.props;

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
                  placeholder="Voter Id"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  onChange={({ target: { value } }) =>
                    this.setState({ username: value })
                  }
                  onKeyPress={({ key }) => (key === "Enter" ? this.login() : null)}
                />
              </div>
              <div className="isoCenterComponent">
                <Button type="primary" onClick={this.login}>
                  {loading ? (
                    <Icon
                      type="loading"
                      style={{ color: "rgba(255,255,255,255)" }}
                    />
                  ) : (
                    <i />
                  )}
                  Continue
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

export default connect(mapStateToProps)(VoterLogin);
