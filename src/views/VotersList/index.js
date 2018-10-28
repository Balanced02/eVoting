import React, { Component } from "react";
import VoterList from "../../components/VoterList";
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
import { callApi, picUpload } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";

class VotingCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true
      },
      voterDetails: {
        _id: "",
        surName: "",
        firstName: "",
        otherNames: "",
        dob: "",
        facialMarks: "",
        stateOfOrigin: "",
        localGovtArea: "",
        address: "",
        passport: ""
      }
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      voterDetails: {
        ...this.state.voterDetails,
        [name]: value
      }
    });
  }

  clear() {
    this.setState({
      ...this.state,
      voterDetails: {
        _id: "",
        surName: "",
        firstName: "",
        otherNames: "",
        dob: "",
        facialMarks: "",
        stateOfOrigin: "",
        localGovtArea: "",
        address: "",
        passport: ""
      }
    });
  }

  submit() {
    let {
      surName,
      firstName,
      otherNames,
      dob,
      facialMarks,
      stateOfOrigin,
      localGovtArea,
      address
    } = this.state.voterDetails;
    if (
      !surName ||
      !firstName ||
      !otherNames ||
      !dob ||
      !facialMarks ||
      !stateOfOrigin ||
      !localGovtArea ||
      !address
    ) {
      this.props.dispatch(showError("All fields must be filled"));
      return;
    }
    picUpload(this.state.uploadFile)
      .then(data => {
        this.setState({
          ...this.state,
          voterDetails: {
            passport: data
          }
        });
        callApi(
          "/newVoter",
          { ...this.state.voterDetails, passport: data },
          "POST"
        )
          .then(data => {
            this.props.dispatch(showInfo("Successfully Created"));
            this.clear();
            this.getCategories();
          })
          .catch(err =>
            this.props.dispatch(showError("Error updating voter details"))
          );
        this.props.dispatch(showInfo("Uploaded successfully"));
      })
      .catch(err => this.props.dispatch(showError("Error uploading image")));
  }

  select(data) {
    this.setState({
      ...this.state,
      voterDetails: {
        ...data
      }
    });
  }

  getVotersList() {
    callApi("/getVotersList")
      .then(data => {
        this.setState({
          ...this.state,
          data: {
            searchResults: data,
            searching: false
          }
        });
      })
      .catch(err => {
        this.props.dispatch(showError("Error fetching voters list"));
        this.setState({
          ...this.state,
          data: {
            searching: false,
            searchResults: []
          }
        });
      });
  }

  componentWillMount() {
    this.getVotersList();
  }

  render() {
    const { customizedTheme } = this.props;
    return (
      <div
        style={{
          backgroundColor: customizedTheme.backgroundColor
        }}
      >
        <Card>
          <CardBody>
            <VoterList
              data={this.state.data}
              select={data => this.select(data)}
            />
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
}))(VotingCategory);
