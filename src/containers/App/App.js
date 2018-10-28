import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Debounce } from "react-throttle";
import { WindowResizeListener } from "react-window-resize-listener";
import { siteConfig } from "../../config.js";
import asyncComponent from "../../helpers/AsyncFunc";
import ThemeSwitcher from "../../containers/ThemeSwitcher";

import Card from "../../components/uielements/card";

import Topbar from "../../containers/Topbar/Topbar";
import Sidebar from "../../containers/Sidebar/Sidebar";
import PageLoading from "../../components/PageLoading";
import "./global.css";

import { callApi } from "../../utils";
import { login } from "../../actions/auth";
import appActions from "../../redux/app/actions";
import AppHolder from "./commonStyle";
import Dashboard from "../../views/Dashboard";
import VotingCategory from "../../views/VotingCategory";
import Voters from "../../views/Voters";
import VotersList from "../../views/VotersList";
import Aspirants from "../../views/Aspirants";
import VotingSession from "../../views/VotingSession";
import GenerateReport from "../../views/GenerateReport";
import CastVote from "../../views/CastVote";

const Footer = Layout.Footer;
const { toggleAll } = appActions;
const Content = Layout.Content;

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: this.props.authenticated,
      redirect: false,
      user: {
        userType: 'super'
      }
    };
  }

  componentWillMount() {
    if (!this.props.authenticated) {
      // callApi("/me")
      //   .then(response => {
      //     if (response.authenticated) {
      //       this.props.dispatch(login(response.user));
      //       this.setState({
      //         ready: true,
      //         redirect: false,
      //         user: response.user
      //       });
      //     } else {
      //       this.setState({ redirect: true });
      //     }
      //   })
      //   .catch(err => {
      //     this.setState({ redirect: false });
      //   });
      this.setState({
        ready: true,
        redirect: false,
      })
    } else {
      this.setState({ ready: true });
    }
  }

  userComponent(userType) {
    let view;
    switch (userType) {
      case "super":
        view = (
          <Switch>
            <Route path="/dashboard" name="Dashboard" component={Dashboard} />
            <Route
              path="/votingCategory"
              name="Voting Category"
              component={VotingCategory}
            />
            <Route
              path="/registerVoters"
              name="RegisterVoters"
              component={Voters}
            />
            <Route
              path="/votersList"
              name="Register Voters"
              component={VotersList}
            />
            <Route
              path="/aspirants"
              name="Register Aspirants"
              component={Aspirants}
            />
            <Route
              path="/votingSession"
              name="Voting Session"
              component={VotingSession}
            />
            <Route
              path="/generateReport"
              name="Generate Report"
              component={GenerateReport}
            />
            <Route path="/castVote" name="Dashboard" component={CastVote} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        );
        break;
      case "voter":
        view = (
          <Switch>
            <Route path="/castVote" name="Dashboard" component={CastVote} />
            <Redirect from="/" to="/castVote" />
          </Switch>
        );
        break;
      default:
        view = "none";
    }
    return view;
  }

  render() {
    const userType = this.state.user.userType;
    const userComponent = this.userComponent(userType);
    console.log("already here", userType);

    return this.state.ready ? (
      <AppHolder>
        <Layout style={{ height: "100vh" }}>
          <Debounce time="1000" handler="onResize">
            <WindowResizeListener
              onResize={windowSize =>
                this.props.toggleAll(
                  windowSize.windowWidth,
                  windowSize.windowHeight
                )
              }
            />
          </Debounce>
          <Topbar {...this.props} />
          <Layout style={{ flexDirection: "row", overflowX: "hidden" }}>
            <Sidebar {...this.props} />
            <Layout
              className="isoContentMainLayout"
              style={{
                height: "100vh"
              }}
            >
              <Content
                className="isomorphicContent"
                style={{
                  padding: "70px 0 0",
                  flexShrink: "0",
                  background: "#f1f3f6"
                }}
              >
                <Card>{userComponent}</Card>
              </Content>
              {userType === "super" ||
              userType === "voter" ||
              userType === "aspirant" ? (
                <Footer
                  style={{
                    background: "#ffffff",
                    textAlign: "center",
                    borderTop: "1px solid #ededed"
                  }}
                >
                  <a href="https://web.facebook.com/Adebalanced02">
                    {" "}
                    {siteConfig.footerText}
                  </a>
                </Footer>
              ) : (
                <i />
              )}
            </Layout>
          </Layout>
          <ThemeSwitcher />
        </Layout>
      </AppHolder>
    ) : !this.state.redirect ? (
      <PageLoading />
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    toggleAll,
    selectedTheme: state.ThemeSwitcher.toJS().changeThemes.themeName
  };
};

export default connect(mapStateToProps)(Full);
