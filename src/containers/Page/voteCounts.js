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
import { Table } from "reactstrap";
import { history } from "../../index";
import States from '../../utils/States'

class VoteCount extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      electionValues: []
    };
  }

  getCounts = () => {
    let electionValues = States.map(state => ({
      name: state.state.name,
      count1: Math.floor(Math.random() * 10000),
      count2: Math.floor(Math.random() * 10000),
      count3: Math.floor(Math.random() * 10000)
    }))
    this.setState(prevState => ({
      electionValues: electionValues.map((electionValue, index) => {
        if(prevState.electionValues[index]){
          if(prevState.electionValues[index].count1 > electionValue.count1) {
            electionValue.count1 = prevState.electionValues[index].count1
          }
          if(prevState.electionValues[index].count2 > electionValue.count2) {
            electionValue.count2 = prevState.electionValues[index].count2
          }
          if(prevState.electionValues[index].count3 > electionValue.count3) {
            electionValue.count3 = prevState.electionValues[index].count3
          }
        }
        return electionValue
      })
    }))
  }

  componentDidMount() {
    setInterval(() => this.getCounts(), 3000)
  }

  componentWillMount() {
    this.getCounts()
  }

  render() {
    let { username, password } = this.state;
    let { dispatch, loading } = this.props;
    const login = () => {
      history.push("/securityCheck");
    };


    return (
      <div style={{ padding: 10 }} >
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper" style={{ textAlign: 'center', fontSize: 25, }} >
              Live Vote Counts
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Table>
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>PNP</th>
                      <th>ACN</th>
                      <th>NDP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.electionValues.map(electionValue => <tr>
                        <td> {electionValue.name} </td>
                        <td> {electionValue.count1} </td>
                        <td> {electionValue.count2} </td>
                        <td> {electionValue.count3} </td>
                      </tr>)
                    }
                  </tbody>
                </Table>
              </div>
              <div className="isoCenterComponent">
                <Button type="primary" onClick={login}>
                  {loading ? (
                    <Icon
                      type="loading"
                      style={{ color: "rgba(255,255,255,255)" }}
                    />
                  ) : (
                    <i />
                  )}
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.feedback.loading
  };
};

export default connect(mapStateToProps)(VoteCount);
