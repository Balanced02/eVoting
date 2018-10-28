import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import { Icon } from "antd";
import { history } from "../../index";

class SecurityCheck extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      question: [
        {
          id: "0001",
          question: "What is your favourite pet name"
        },
        {
          id: "003",
          question: "What is your mother's maiden name"
        }
      ],
      questionIndex: 0
    };
  }

  login = () => {
    const { questionIndex } = this.state;
    if (questionIndex === 0) {
      this.setState({
        questionIndex: 1
      });
    } else {
      history.push("/castVote");
    }
  };

  render() {
    let { username, password, question, questionIndex } = this.state;
    let { dispatch, loading } = this.props;

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
              <div className="isoLoginContent">
                {question[questionIndex].question}
              </div>
              <div className="isoInputWrapper">
                <Input
                  id="inputUserName"
                  size="large"
                  placeholder="Answer"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  onChange={({ target: { value } }) =>
                    this.setState({ username: value })
                  }
                  onKeyPress={({ key }) =>
                    key === "Enter" ? this.login() : null
                  }
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
                  Submit
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

export default connect(mapStateToProps)(SecurityCheck);
