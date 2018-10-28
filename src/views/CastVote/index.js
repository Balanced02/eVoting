import React, { Component } from "react";
import { connect } from "react-redux";
import { callApi } from "../../utils";

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

import AspirantCard from "../../components/AspirantCard";

import { showError, showInfo } from "../../actions/feedback";
import { Tabs } from "antd";
import Passport from '../../image/user1.png'
import Passport2 from '../../image/user2.png'
import Passport3 from '../../image/user3.png'


const duration = 700;

const aspirants = [{
  id: '0001',
  fullName: 'Dayo Adeniyi',
  passport: Passport,
  dob: new Date('December 17, 1992'),
  partyName: 'Action Peoples congress'
}, {
  id: '0003',
  fullName: 'Adekunle Gold',
  passport: Passport2,
  dob: new Date('December 17, 1994'),
  partyName: 'Sumptuous Meal Group'
}, {
  id: '0004',
  fullName: 'Lukman Olukunle',
  passport: Passport3,
  dob: new Date('November 17, 1993'),
  partyName: 'Feed Well Group'
}]

const electionCategories = [
  {
    _id: "0001",
    name: "Presidential"
  },
  {
    _id: "0002",
    name: "Governorship"
  },
  {
    _id: "0003",
    name: "Senatorial"
  },
  {
    _id: "0004",
    name: "House of Reps"
  }
];


const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

class CastVote extends Component {
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
      },
      aspirants: {
        searching: true,
        searchResults: []
      }
    });
    this.getAspirants(value);
  }

  getAspirants(value) {
    this.props.dispatch(showInfo("Getting Aspirant Lists..."));
    this.setState({
      aspirants: {
        searching: false,
        searchResults: aspirants
      }
    })
  }

  getCategories() {
    // callApi("/getCategories")
    //   .then(data => {
    //     this.setState({
    //       ...this.state,
    //       categories: {
    //         searchResults: data,
    //         searching: false
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     this.props.dispatch(showError("Error fetching category list"));
    //     this.setState({
    //       ...this.state,
    //       categories: {
    //         searching: false,
    //         searchResults: []
    //       }
    //     });
    //   });
        this.setState({
          ...this.state,
          vSessions: {
            searchResults: [],
            searching: false
          }
        });
  }

  componentWillMount() {
    // this.getSessions();
    this.getCategories();
  }

  select(data) {
    let obj = {
      voterId: this.state.user._id,
      votingSession: this.state.reportDetails.votingSession,
      category: data.post,
      aspirant: data._id,
      voteId: data.voteId || ""
    };

    if (data.voteId.length) {
      this.props.dispatch(showError("Already Voted for selected aspirant"));
      return;
    }

    let removeVote = this.state.aspirants.searchResults
      .filter(asp => asp.post === data.post)
      .filter(a => a.voteId.length > 0);
    if (removeVote.length) {
      removeVote.forEach(vot => {
        callApi(`/removeVote/${vot.voteId}`)
          .then(dat => console.log("Removed Successfully"))
          .catch(err => console.log("Error"));
      });
    }
    callApi("/createVote", obj, "POST")
      .then(dat => {
        this.getAspirants(this.state.reportDetails.votingSession);
        this.props.dispatch(showInfo("Vote Cast Successfully"));
      })
      .catch(err => this.props.dispatch(showError("Error Casting Vote")));
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
                          Voting Category
                        </Label>
                        <Input
                          type="select"
                          name="votingSession"
                          id="votingSession"
                          value={votingSession}
                          onChange={e => this.handleInputChange(e)}
                        >
                          <option selected disabled>
                            Election Category
                          </option>
                          {electionCategories.map((category, i) => (
                            <option
                              value={category._id}
                              key={i}
                            >
                              {category.name}
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
              this.state.aspirants.searchResults.length ? (
                this.state.aspirants.searchResults.map(asp => (
                  <AspirantCard
                    data={asp}
                    key={asp._id}
                    categories={this.state.categories.searchResults}
                    select={data => this.select(data)}
                  />
                ))
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

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    selectedTheme: state.ThemeSwitcher.toJS().changeThemes.themeName
  };
};

export default connect(mapStateToProps)(CastVote);
