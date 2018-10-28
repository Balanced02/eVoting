import React, { Component } from "react";
// import { Bar, Line } from 'react-chartjs-2';
import Card from "../../components/uielements/card";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { message } from "antd";
import "../../containers/App/global.css";
import DashboardSummary from "../../components/DashboardSummary";
import { callApi } from "../../utils";
import { showError } from "../../actions/feedback";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      searching: true
    };
  }

  getSummary() {
    // callApi("/getSummary")
    //   .then(data => {
    //     this.setState({
    //       ...this.state,
    //       data,
    //       searching: false
    //     });
    //   })
    //   .catch(err =>
    //     this.props.dispatch(showError("Error getting Summary Data"))
    //   );
  }

  componentWillMount() {
    this.getSummary();
  }

  render() {
    const { customizedTheme } = this.props;
    const { data } = this.state;
    return (
      <div
        style={{
          backgroundColor: customizedTheme.backgroundColor
        }}
      >
        <Card>
          <DashboardSummary data={data} searching={false} />
        </Card>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS(),
  customizedTheme: state.ThemeSwitcher.toJS().layoutTheme,
  user: state.auth.user
}))(Dashboard);
