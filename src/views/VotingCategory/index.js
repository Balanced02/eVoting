import React, { Component } from "react";
import CategoryList from "../../components/CategoryList";
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

class VotingCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true
      },
      categoryDetails: {
        _id: "",
        categoryName: ""
      }
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      categoryDetails: {
        ...this.state.categoryDetails,
        [name]: value
      }
    });
  }

  clear() {
    this.setState({
      ...this.state,
      categoryDetails: {
        _id: "",
        categoryName: ""
      }
    });
  }

  submit() {
    if (!this.state.categoryDetails.categoryName) {
      this.props.dispatch(showError("Category name must be filled"));
      return;
    }
    callApi("/newCategory", this.state.categoryDetails, "POST")
      .then(data => {
        this.props.dispatch(showInfo("Successfully Created"));
        this.clear();
        this.getCategories();
      })
      .catch(err => this.props.dispatch(showError("Error creating category")));
  }

  select(data) {
    this.setState({
      ...this.state,
      categoryDetails: {
        ...data
      }
    });
  }

  getCategories() {
    callApi("/getCategories")
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
        this.props.dispatch(showError("Error fetching category list"));
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
    this.getCategories();
  }

  render() {
    const { customizedTheme } = this.props;
    let { categoryName } = this.state.categoryDetails;
    return (
      <div
        style={{
          backgroundColor: customizedTheme.backgroundColor
        }}
      >
        <Card>
          <CardHeader>Voting Category</CardHeader>
          <CardBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="categoryName">Category Name</Label>
                  <Input
                    type="email"
                    name="categoryName"
                    id="categoryName"
                    placeholder="President"
                    value={categoryName}
                    onChange={e => this.handleInputChange(e)}
                  />
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
                <CategoryList
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
}))(VotingCategory);
