import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import { Icon } from "antd";
import { startRegister } from "../../actions/auth";
import { showError, showInfo } from "../../actions/feedback";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      userDetails: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordC: "",
        userType: "super"
      },
      loading: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    this.props.history.push("/dashboard");
  };

  signUp() {
    this.setState({
      ...this.state,
      loading: true
    });
    let {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordC
    } = this.state.userDetails;
    if (password.length < 8) {
      this.props.dispatch(
        showError("Passwords must be more than 8 characters")
      );
    }
    if (password !== passwordC) {
      this.props.dispatch(showError("Passwords does not match"));
      this.setState({
        ...this.state,
        loading: false
      });
      return;
    }
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !passwordC
    ) {
      this.props.dispatch(showError("All fields are compulsory"));
      this.setState({
        ...this.state,
        loading: false
      });
      return;
    }
    this.props.dispatch(startRegister(this.state.userDetails));
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      userDetails: {
        ...this.state.userDetails,
        [name]: value
      }
    });
  }

  render() {
    let { loading } = this.state;
    let {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordC
    } = this.state.userDetails;
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="Create An Account" />
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input
                  size="large"
                  placeholder="First name"
                  name="firstName"
                  onChange={e => this.handleInputChange(e)}
                  value={firstName}
                />
                <Input
                  size="large"
                  placeholder="Last name"
                  name="lastName"
                  onChange={e => this.handleInputChange(e)}
                  value={lastName}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Username"
                  name="username"
                  onChange={e => this.handleInputChange(e)}
                  value={username}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Email"
                  name="email"
                  onChange={e => this.handleInputChange(e)}
                  value={email}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={e => this.handleInputChange(e)}
                  value={password}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordC"
                  onChange={e => this.handleInputChange(e)}
                  value={passwordC}
                />
              </div>
              <Button type="primary" onClick={() => this.signUp()}>
                {loading ? (
                  <Icon
                    type="loading"
                    style={{ color: "rgba(255,255,255,255)" }}
                  />
                ) : (
                  <i />
                )}
                <IntlMessages id="Sign Up" />
              </Button>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect()(SignUp);
