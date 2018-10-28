import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Button,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import "../../containers/App/global.css";
import UInput from "../../components/uielements/input";
import Dropzone from "react-dropzone";
import { callApi, picUpload } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";
import States from "../../utils/States";

class RegisterVoters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voterDetails: {
        firstName: '',
        lastName: '',
        otherNames: '',
        address: '',
        dob: '',
        email: '',
        secretQuestion: '',
        secretQuestion2:'',
        secretQuestion3: '',
        secretAnswer: '',
        secretAnswer2: '',
        secretAnswer3: '',
        stateOfOrigin: '',
        localGovtArea: '',
      },
      localGovt: [],
      uploading: false,
      imageUrl: "",
      uploadFile: ""
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
    if (name === "stateOfOrigin") {
      this.setState({
        ...this.state,
        voterDetails: {
          ...this.state.voterDetails,
          localGovtArea: "",
          stateOfOrigin: value
        }
      });
      this.filterLocalGovt(value);
    } else if (name === "localGovtArea") {
      this.setState({
        ...this.state,
        voterDetails: {
          ...this.state.voterDetails,
          localGovtArea: value
        }
      });
    }
  }

  handleFacialMarkChange() {
    this.setState({
      ...this.state,
      voterDetails: {
        ...this.state.voterDetails,
        facialMarks: !this.state.voterDetails.facialMarks
      }
    });
  }

  filterLocalGovt(val) {
    let localGovt = States.filter(state => state.state.name === val);
    this.setState({
      localGovt: [...localGovt[0].state.locals]
    });
  }

  setLocalGovt(val) {
    this.setState({
      ...this.state,
      voterDetails: {
        ...this.state.voterDetails,
        localGovtArea: val
      }
    });
  }

  clear() {
    this.setState({
      ...this.state,
      voterDetails: {
        firstName: '',
        lastName: '',
        otherNames: '',
        address: '',
        dob: '',
        email: '',
        secretQuestion: '',
        secretQuestion2:'',
        secretQuestion3: '',
        secretAnswer: '',
        secretAnswer2: '',
        secretAnswer3: '',
        stateOfOrigin: '',
        localGovtArea: '',
      }
    });
  }

  submit() {
    let {
      firstName,
      lastName,
      otherNames,
      dob,
      address,
      email,
      stateOfOrigin,
      localGovtArea,
      secretQuestion,
      secretQuestion2,
      secretQuestion3,
      secretAnswer,
      secretAnswer2,
      secretAnswer3,
    } = this.state.voterDetails;
    if (
      !firstName ||
      !lastName ||
      !otherNames ||
      !dob ||
      !address ||
      !email ||
      !stateOfOrigin ||
      !localGovtArea ||
      !secretQuestion ||
      !secretQuestion2 ||
      !secretQuestion3 ||
      !secretAnswer ||
      !secretAnswer2 ||
      !secretAnswer3
    ) {
      this.props.dispatch(showError("All fields must be filled"));
      return;
    }
    this.props.dispatch(showInfo("Uploading Image..."));
    picUpload(this.state.uploadFile)
      .then(data => {
        this.setState({
          ...this.state,
          voterDetails: {
            ...this.state.voterDetails,
            passport: data
          }
        });
        this.props.dispatch(showInfo("Creating User"));
        callApi(
          "/auth/register",
          { ...this.state.voterDetails, passport: data },
          "POST"
        )
          .then(data => {
            this.props.dispatch(showInfo("Successfully Created"));
            this.clear();
          })
          .catch(err => this.props.dispatch(showError("Error creating Voter")));
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

  onImageDrop(files) {
    this.setState({
      ...this.state,
      uploadFile: files[0],
      uploading: true
    });
    this.viewfile(files[0]);
  }

  viewfile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        uploading: false,
        imageUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  changeImage() {
    this.setState({
      ...this.state,
      uploadFile: "",
      uploading: false,
      imageUrl: ""
    });
  }

  render() {
    const { customizedTheme } = this.props;
    let {
      firstName,
      lastName,
      otherNames,
      dob,
      address,
      email,
      stateOfOrigin,
      localGovtArea,
      secretQuestion,
      secretQuestion2,
      secretQuestion3,
      secretAnswer,
      secretAnswer2,
      secretAnswer3,
    } = this.state.voterDetails;
    let { imageUrl } = this.state;
    return (
      <div
        style={{
          backgroundColor: customizedTheme.backgroundColor
        }}
      >
        <Card>
          <CardHeader style={{ fontSize: 20 }}>Register Voters</CardHeader>
          <CardBody>
            {this.state.uploading ? (
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p>
                    <i
                      className="fa fa-spinner fa-pulse fa-spin fa-5x"
                      style={{ color: "green" }}
                    />
                  </p>
                </div>
                <p style={{ textAlign: "center", fontSize: 20 }}>
                  Please wait...
                </p>
              </div>
            ) : imageUrl ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10
                }}
              >
                <div className="contain">
                  <img
                    alt="logo"
                    src={imageUrl}
                    className="thumbnail image"
                    style={{ width: "auto", height: 150 }}
                  />
                  <div className="overlay" onClick={() => this.changeImage()}>
                    <div
                      className="text"
                      style={{
                        background: "#dddddd",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "5px",
                        marginTop: "10px"
                      }}
                    >
                      Change Image
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 15
                }}
              >
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  onDrop={file => this.onImageDrop(file)}
                  name="logos"
                >
                  <p
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      margin: 10,
                      marginTop: 60
                    }}
                  >
                    Drop an image or click to select a file to upload.
                  </p>
                </Dropzone>
              </div>
            )}
            <Row>
              <Col xs='12' md='4' >
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="lastName">
                    Last Name (Surname)
                  </Label>
                  <UInput
                    type="email"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='4'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="firstName">
                    First Name
                  </Label>
                  <UInput
                    type="email"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='4'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="otherNames">
                    Other Names
                  </Label>
                  <UInput
                    type="email"
                    name="otherNames"
                    id="otherNames"
                    placeholder="Other Names"
                    value={otherNames}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='4'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="dob">
                    Date of Birth
                  </Label>
                  <UInput
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='4'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="stateOfOrigin">
                    State Of Origin
                  </Label>
                  <Input
                    type="select"
                    value={stateOfOrigin}
                    name="stateOfOrigin"
                    onChange={e => this.handleInputChange(e)}
                  >
                    <option selected disabled value={""}>
                      {" "}
                      State of Origin{" "}
                    </option>
                    {States.map((state, i) => (
                      <option
                        key={i}
                        value={state.state.name}
                        selected={state.state.name === stateOfOrigin}
                      >
                        {" "}
                        {state.state.name}{" "}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs='12' md='4'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="localGovtArea">
                    Local Government Area
                  </Label>
                  <Input
                    type="select"
                    name="localGovtArea"
                    id="localGovtArea"
                    placeholder="Other Names"
                    value={localGovtArea}
                    onChange={e => this.handleInputChange(e)}
                    disabled={!stateOfOrigin ? true : false}
                  >
                    <option selected disabled value={""}>
                    { stateOfOrigin ? "Local Government Area" : "Select State First"}
                    </option>
                    {this.state.localGovt.map((local, i) => (
                      <option
                        key={i}
                        value={local.name}
                        selected={local.name === localGovtArea}
                      >
                        {" "}
                        {local.name}{" "}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs='12' md='6'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="secretQuestion">
                    Enter Secret Question 1
                  </Label>
                  <UInput
                    type="email"
                    name="secretQuestion"
                    id="secretQuestion"
                    placeholder="Favourite Pet Name"
                    value={secretQuestion}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='6'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="secretAnswer">
                    Answer To Secret Question
                  </Label>
                  <UInput
                    type="email"
                    name="secretAnswer"
                    id="secretAnswer"
                    placeholder="Answer to Secret Question 1"
                    value={secretAnswer}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='6'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="secretQuestion2">
                    Enter Secret Question 2
                  </Label>
                  <UInput
                    type="email"
                    name="secretQuestion2"
                    id="secretQuestion2"
                    placeholder="Favourite Pet Name"
                    value={secretQuestion2}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='6'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="secretAnswer2">
                    Answer To Secret Question
                  </Label>
                  <UInput
                    type="email"
                    name="secretAnswer2"
                    id="secretAnswer2"
                    placeholder="Answer to Secret Question 2"
                    value={secretAnswer2}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='6'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="secretQuestion3">
                    Enter Secret Question 3
                  </Label>
                  <UInput
                    type="email"
                    name="secretQuestion3"
                    id="secretQuestion3"
                    placeholder="Favourite Pet Name"
                    value={secretQuestion3}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='6'>
                <FormGroup>
                  <Label style={{ fontSize: 15 }} for="secretAnswer3">
                    Answer To Secret Question
                  </Label>
                  <UInput
                    type="email"
                    name="secretAnswer3"
                    id="secretAnswer3"
                    placeholder="Answer to Secret Question 3"
                    value={secretAnswer3}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='8'>
                <FormGroup>
                  <Label for="address" style={{ fontSize: 15 }}>
                    Address
                  </Label>
                  <Input
                    type="textarea"
                    name="address"
                    id="address"
                    value={address}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
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
}))(RegisterVoters);
