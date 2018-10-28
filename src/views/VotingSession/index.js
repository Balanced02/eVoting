import React, { Component } from "react";
import SessionList from "../../components/SessionList";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import "../../containers/App/global.css";
import { callApi } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";

class VotingSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true
      },
      sessionDetails: {
        endDate: "",
        startDate: "",
        status: true
      }
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      sessionDetails: {
        ...this.state.sessionDetails,
        [name]: value
      }
    });
  }

  clear() {
    this.setState({
      ...this.state,
      sessionDetails: {
        _id: "",
        endDate: "",
        startDate: "",
        status: true
      }
    });
  }

  submit() {
    if (
      !this.state.sessionDetails.startDate ||
      !this.state.sessionDetails.endDate
    ) {
      this.props.dispatch(showError("All fields must be filled"));
      return;
    }
    // callApi("/createSession", this.state.sessionDetails, "POST")
    //   .then(data => {
    //     this.props.dispatch(showInfo("Successfully Created"));
    //     this.clear();
    //     this.getSessions();
    //   })
    //   .catch(err => this.props.dispatch(showError("Error creating session")));
  }

  select(data) {
    this.setState({
      ...this.state,
      sessionDetails: {
        ...data
      }
    });
  }

  getSessions() {
  //   callApi("/sessionList")
  //     .then(data => {
  //       this.setState({
  //         ...this.state,
  //         data: {
  //           searchResults: data,
  //           searching: false
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       this.props.dispatch(showError("Error fetching session list"));
  //       this.setState({
  //         ...this.state,
  //         data: {
  //           searching: false,
  //           searchResults: []
  //         }
  //       });
  //     });

  this.setState({
    data: {
      searching: false,
      searchResults: [],
    }
  })
  }

  componentWillMount() {
    this.getSessions();
  }

  render() {
    const { customizedTheme } = this.props;
    let { endDate, startDate, status } = this.state.sessionDetails;
    return (
      <div
        style={{
          backgroundColor: customizedTheme.backgroundColor
        }}
      >
        <Card>
          <CardHeader>Voting Session</CardHeader>
          <CardBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="month"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input
                    type="month"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="status">Active/Inactive</Label>
                  <Input
                    type="select"
                    name="status"
                    id="status"
                    value={status}
                    onChange={e => this.handleInputChange(e)}
                  >
                    <option value={true} selected={status == "true"}>
                      {" "}
                      Active{" "}
                    </option>
                    <option value={false} selected={status == "false"}>
                      {" "}
                      Inactive{" "}
                    </option>
                  </Input>
                </FormGroup>
                <Button outline color="primary" onClick={() => this.submit()}>
                  {" "}
                  Save{" "}
                </Button>
                <Button
                  outline
                  color="danger"
                  style={{ float: "right" }}
                  onClick={() => this.clear()}
                >
                  {" "}
                  Clear{" "}
                </Button>
              </Col>
              <Col md={6}>
                <SessionList
                  data={this.state.data}
                  select={data => this.select(data)}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS(),
  customizedTheme: state.ThemeSwitcher.toJS().layoutTheme,
  user: state.auth.user
}))(VotingSession);
