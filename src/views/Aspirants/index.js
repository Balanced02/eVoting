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
  FormText,
  Input
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import "../../containers/App/global.css";
import UInput from "../../components/uielements/input";
import Dropzone from "react-dropzone";
import { callApi, picUpload } from "../../utils";
import { showError, showInfo } from "../../actions/feedback";
import States from "../../utils/States";

const politicalParties = [
  {
    _id: "0009",
    name: "Peoples Republic Party",
    shortCode: "PRP"
  },
  {
    _id: "0008",
    name: "Action Peoples Party",
    shortCode: "APP"
  },
  {
    _id: "0007",
    name: "Wecode Action Abuja",
    shortCode: "WAA"
  }
];

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

const availablePosts = [
  {
    _id: "0055",
    name: "President",
    category: "0001"
  },
  {
    _id: "0056",
    name: "Vice President",
    category: "0001"
  },
  {
    _id: "0057",
    name: "Senate President",
    category: "0003"
  },
  {
    _id: "0058",
    name: "Seat",
    category: "0003"
  },
  {
    _id: "0059",
    name: "Head of Reps",
    category: "0004"
  },
  {
    _id: "0060",
    name: "Seat",
    category: "0004"
  },
  {
    _id: "0061",
    name: "Provost",
    category: "0004"
  }
];

class RegisterAspirants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voterDetails: {
        surName: "",
        firstName: "",
        otherNames: "",
        dob: "",
        facialMarks: false,
        stateOfOrigin: "",
        localGovtArea: "",
        address: "",
        passport: "",
        post: "",
        gender: "",
        qualification: "",
        attestation: false,
        votingSession: "",
        politicalParty: "",
        electionCategory: ""
      },
      vSessions: [],
      localGovt: [],
      categories: [],
      uploading: false,
      imageUrl: "",
      uploadFile: ""
    };
  }

  handleCheckChange() {
    this.setState({
      ...this.state,
      voterDetails: {
        ...this.state.voterDetails,
        attestation: !this.state.voterDetails.attestation
      }
    });
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

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      voterDetails: {
        ...this.state.voterDetails,
        [name]: value
      }
    });
    name == "stateOfOrigin"
      ? this.filterLocalGovt(value)
      : name === "localGovtArea"
        ? this.setLocalGovt(value)
        : "";
  }

  filterLocalGovt(val) {
    let localGovt = States.filter(state => state.state.name === val);
    this.setState({
      ...this.state,
      voterDetails: {
        ...this.state.voterDetails,
        stateOfOrigin: val,
        localGovtArea: ""
      },
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
        _id: "",
        surName: "",
        firstName: "",
        otherNames: "",
        dob: "",
        facialMarks: false,
        stateOfOrigin: "",
        localGovtArea: "",
        address: "",
        passport: "",
        post: "",
        gender: "",
        prevPost: "",
        votingSession: "",
        username: "",
        password: "",
        cPassword: "",
        userType: "aspirant"
      }
    });
  }

  submit() {
    let {
      surName,
      firstName,
      otherNames,
      dob,
      stateOfOrigin,
      localGovtArea,
      address,
      post,
      gender,
      attestation,
      votingSession,
      username,
      password,
      cPassword
    } = this.state.voterDetails;
    if (
      !surName ||
      !firstName ||
      !otherNames ||
      !dob ||
      !stateOfOrigin ||
      !localGovtArea ||
      !address ||
      !post ||
      !gender ||
      !attestation ||
      !votingSession ||
      !username ||
      !password ||
      !cPassword
    ) {
      this.props.dispatch(showError("All fields must be filled"));
      return;
    }
    if (password !== cPassword) {
      this.props.dispatch(showError("Passwords do not match"));
      return;
    }
    this.props.dispatch(showInfo("Uploading Image ..."));
    picUpload(this.state.uploadFile)
      .then(data => {
        this.setState({
          ...this.state,
          voterDetails: {
            ...this.state.voterDetails,
            passport: data
          }
        });
        this.props.dispatch(showInfo("Creating Aspirant's Data"));
        callApi(
          "/auth/register",
          { ...this.state.voterDetails, passport: data },
          "POST"
        )
          .then(data => {
            this.props.dispatch(showInfo("Successfully Created"));
            this.clear();
          })
          .catch(err =>
            this.props.dispatch(showError("Error creating aspirant's Data"))
          );
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

  getCategories() {
    callApi("/getCategories")
      .then(data => {
        this.setState({
          ...this.state,
          categories: data
        });
      })
      .catch(err =>
        this.props.dispatch(showError("Error fetching category list"))
      );
  }

  getSessions() {
    callApi("/sessionList")
      .then(data => {
        this.setState({
          ...this.state,
          vSessions: data
        });
      })
      .catch(err => {
        this.props.dispatch(showError("Error fetching session list"));
        this.setState({
          ...this.state,
          vSessions: []
        });
      });
  }

  componentWillMount() {
    // this.getCategories();
    // this.getSessions();
  }

  render() {
    const { customizedTheme } = this.props;
    let { categories, vSessions } = this.state;
    let {
      surName,
      firstName,
      otherNames,
      dob,
      facialMarks,
      stateOfOrigin,
      localGovtArea,
      address,
      post,
      gender,
      qualification,
      attestation,
      votingSession,
      politicalParty,
      electionCategory
    } = this.state.voterDetails;
    let { imageUrl } = this.state;
    return (
      <div
        style={{
          backgroundColor: customizedTheme.backgroundColor
        }}
      >
        <Card>
          <CardHeader style={{ fontSize: 20 }}>Register Applicants</CardHeader>
          <CardBody>
            <Card>
              <CardHeader style={{ fontSize: 15 }}>Personal Details</CardHeader>
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
                      e
                      <div
                        className="overlay"
                        onClick={() => this.changeImage()}
                      >
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
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="surName">
                        Last Name (Surname)
                      </Label>
                      <Input
                        type="email"
                        name="surName"
                        id="surName"
                        placeholder="Last Name"
                        value={surName}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="firstName">
                        First Name
                      </Label>
                      <Input
                        type="email"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="otherNames">
                        Other Names
                      </Label>
                      <Input
                        type="email"
                        name="otherNames"
                        id="otherNames"
                        placeholder="Other Names"
                        value={otherNames}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="dob">
                        Date of Birth
                      </Label>
                      <Input
                        type="date"
                        name="dob"
                        id="dob"
                        value={dob}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
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
                        <option value="" disabled>
                          {" "}
                          State of Origin{" "}
                        </option>
                        {States.map((state, i) => (
                          <option
                            key={i}
                            value={state.state.name}
                          >
                            {" "}
                            {state.state.name}{" "}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
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
                        <option value="" disabled>
                          {" "}
                          Local Government Area{" "}
                        </option>
                        {this.state.localGovt.map((local, i) => (
                          <option
                            key={i}
                            value={local.name}
                          >
                            {" "}
                            {local.name}{" "}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="politicalParty">
                        Political Party
                      </Label>
                      <Input
                        type="select"
                        name="politicalParty"
                        id="politicalParty"
                        value={politicalParty}
                        onChange={e => this.handleInputChange(e)}
                      >
                        <option value="" disabled>
                          {" "}
                          Political Party{" "}
                        </option>
                        {politicalParties.map((party, i) => (
                          <option
                            value={party._id}
                            key={i}
                          >
                            {" "}
                            {party.name}{" "}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="electionCategory">
                        Election Category
                      </Label>
                      <Input
                        type="select"
                        name="electionCategory"
                        id="electionCategory"
                        value={electionCategory}
                        onChange={e => this.handleInputChange(e)}
                      >
                        <option value="" disabled>
                          Election Category
                        </option>
                        {electionCategories.map((category, i) => (
                          <option
                            value={category._id}
                            key={i}
                          >
                            {" "}
                            {category.name}{" "}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="post">
                        Post Vying For
                      </Label>
                      <Input
                        type="select"
                        name="post"
                        id="post"
                        value={post}
                        onChange={e => this.handleInputChange(e)}
                      >
                        <option value="" disabled>
                          {electionCategory
                            ? "Post Vying for"
                            : "Select Category First"}
                        </option>
                        {availablePosts
                          .filter(
                            availablePost =>
                              availablePost.category === electionCategory
                          )
                          .map((cat, i) => (
                            <option
                              value={cat._id}
                              key={i}
                            >
                              {" "}
                              {cat.name}{" "}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="qualification">
                        Qualifications
                      </Label>
                      <Input
                        type="text"
                        value={qualification}
                        name="qualification"
                        placeholder="Highest qualification first"
                        onChange={e => this.handleInputChange(e)}
                      />
                      <FormText> Please Seperate with a comma </FormText>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="gender">
                        Gender
                      </Label>
                      <Input
                        type="select"
                        name="gender"
                        id="gender"
                        placeholder="Other Names"
                        value={gender}
                        onChange={e => this.handleInputChange(e)}
                      >
                        <option value="" disabled>
                          {" "}
                          Gender{" "}
                        </option>
                        <option value="M">
                          {" "}
                          Male{" "}
                        </option>
                        <option value="F">
                          {" "}
                          Female{" "}
                        </option>
                        <option value="U">
                          {" "}
                          Undisclosed{" "}
                        </option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label style={{ fontSize: 15 }} for="votingSession">
                        Political Party
                      </Label>
                      <Input
                        type="select"
                        name="votingSession"
                        id="votingSession"
                        value={votingSession}
                        onChange={e => this.handleInputChange(e)}
                      >
                        <option value="" disabled>
                          {" "}
                          Political Party{" "}
                        </option>
                        {vSessions
                          .filter(sess => sess.status === true)
                          .map((sess, i) => (
                            <option
                              value={sess._id}
                              key={i}
                            >
                              {" "}
                              {`${moment(sess.startDate).format(
                                "MMM YY"
                              )} / ${moment(sess.endDate).format("MMM YY")}`}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="8">
                    <FormGroup>
                      <Label for="address" style={{ fontSize: 15 }}>
                        Address
                      </Label>
                      <Input
                        type="textarea"
                        name="address"
                        id="address"
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardHeader> Attestation </CardHeader>
              <CardBody>
                <FormGroup style={{ marginLeft: 15 }}>
                  <Input
                    type="checkbox"
                    checked={attestation}
                    onChange={() => this.handleCheckChange()}
                  />{" "}
                  <span style={{ fontSize: 15 }}>
                    {" "}
                    Will you be at least 18 years of age on or before the
                    election date{" "}
                  </span>
                </FormGroup>
              </CardBody>
              <CardBody>
                <Button
                  outline
                  color="primary"
                  onClick={() => this.submit()}
                  disabled={!attestation}
                >
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
}))(RegisterAspirants);
