import React, { Component } from "react";
import { connect } from "react-redux";
import { callApi } from "../../utils";

import VoteReport from "../../components/VoteReport";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Label
} from "reactstrap";
import Transition from "react-transition-group/Transition";
import moment from "moment";

import { showError, showInfo } from "../../actions/feedback";
import { Tabs } from "antd";
const duration = 700;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

class GenerateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vSessions: {
        searching: true,
        data: []
      },
      reportDetails: {
        votingSession: ""
      },
      aspirants: {
        searching: false,
        searchResults: []
      },
      votes: {
        searching: false,
        searchResults: []
      },
      categories: {
        searching: true,
        searchResults: []
      },
      filterList: "",
      filteredList: [],
      prevVotes: [],
      user: this.props.user ? this.props.user._doc : ""
    };
  }

  getSessions() {
    callApi("/sessionList")
      .then(data => {
        this.setState({
          ...this.state,
          vSessions: {
            searching: false,
            data: data
          }
        });
      })
      .catch(err => {
        this.props.dispatch(showError("Error fetching session list"));
        this.setState({
          ...this.state,
          vSessions: {
            searching: false,
            data: []
          }
        });
      });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      reportDetails: {
        ...this.state.reportDetails,
        [name]: value
      }
    });
    this.getAspirants(value);
  }

  getAspirants(value) {
    this.props.dispatch(showInfo("Getting Aspirant Lists..."));
    callApi(`/getVoteResult/${value}`)
      .then(({ aspirants, votes }) => {
        this.setState({
          ...this.state,
          aspirants: {
            searchResults: aspirants,
            searching: false
          },
          votes: {
            searchResults: votes,
            searching: false
          },
          filteredList: this.state.filterList.length
            ? aspirants.filter(dat => dat.post === this.state.filterList)
            : aspirants,
          prevVotes: []
        });
      })
      .catch(err =>
        this.props.dispatch(showError("Error getting Aspirant Lists"))
      );
  }

  getCategories() {
    callApi("/getCategories")
      .then(data => {
        this.setState({
          ...this.state,
          categories: {
            searchResults: data,
            searching: false
          }
        });
      })
      .catch(err => {
        this.props.dispatch(showError("Error fetching category list"));
        this.setState({
          ...this.state,
          categories: {
            searching: false,
            searchResults: []
          }
        });
      });
  }

  filterList(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      filterList: value,
      filteredList: value.length
        ? this.state.aspirants.searchResults.filter(asp => asp.post === value)
        : this.state.aspirants.searchResults
    });
  }

  componentWillMount() {
    this.getSessions();
    this.getCategories();
  }

  render() {
    const { vSessions } = this.state;
    const { votingSession } = this.state.reportDetails;
    return (
      <div>
        <Card>
          <CardHeader>Generate Report </CardHeader>
          <CardBody>
            <Row>
              <Col md={3}>
                <Transition in={!vSessions.searching} timeout={900}>
                  {state => (
                    <div
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}
                    >
                      <FormGroup>
                        <Label style={{ fontSize: 15 }} for="votingSession">
                          Voting Session
                        </Label>
                        <Input
                          type="select"
                          name="votingSession"
                          id="votingSession"
                          value={votingSession}
                          onChange={e => this.handleInputChange(e)}
                        >
                          <option selected disabled>
                            {" "}
                            Voting Session{" "}
                          </option>
                          {vSessions.data.map((sess, i) => (
                            <option
                              value={sess._id}
                              key={i}
                              selected={votingSession === sess._id}
                            >
                              {" "}
                              {`${moment(sess.startDate).format(
                                "MMM YY"
                              )} / ${moment(sess.endDate).format("MMM YY")}`}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                  )}
                </Transition>
              </Col>
              <Col md={3}>
                <Transition
                  in={this.state.reportDetails.votingSession !== ""}
                  timeout={900}
                >
                  {state => (
                    <div
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}
                    >
                      <FormGroup>
                        <Label style={{ fontSize: 15 }} for="votingCategory">
                          Filter Aspirant List
                        </Label>
                        <Input
                          type="select"
                          name="votingCategory"
                          id="votingCategory"
                          value={this.state.filterList}
                          onChange={e => this.filterList(e)}
                        >
                          <option selected value={""}>
                            All
                          </option>
                          {this.state.categories.searchResults.map((cat, i) => (
                            <option
                              value={cat._id}
                              key={i}
                              selected={this.state.filterList === cat._id}
                            >
                              {cat.categoryName}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </div>
                  )}
                </Transition>
              </Col>
            </Row>
            <Row>
              {!this.state.reportDetails.votingSession ? (
                <CardBody
                  style={{ marginTop: 20, fontSize: 20, textAlign: "center" }}
                >
                  Please select a voting session above 👆🏾
                </CardBody>
              ) : !this.state.aspirants.searching &&
              !this.state.aspirants.searchResults.length ? (
                <CardBody
                  style={{ marginTop: 20, fontSize: 20, textAlign: "center" }}
                >
                  {" "}
                  No Aspirant found for selected voting session{" "}
                </CardBody>
              ) : !this.state.aspirants.searching &&
              this.state.filteredList.length ? (
                <VoteReport
                  data={this.state.filteredList}
                  categories={this.state.categories.searchResults}
                />
              ) : (
                ""
              )}
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect()(GenerateReport);
