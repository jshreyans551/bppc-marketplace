import React, { Component } from "react";
// import { Router, Link } from "@reach/router";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
  CustomInput
} from "reactstrap";

import * as actions from "../../src/store/actions/index";
const axios = require("axios");

// import { redirectTo } from "@reach/router";

const initialState = {
  fullname: "",
  gender: "",
  phone_no: "",
  year_of_study: "",
  hostel: "",
  room_no: "",
  degree_type: "",
  bits_email: "",
  redirectToDashboard: true
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      gender: "",
      phone_no: "",
      year_of_study: "",
      hostel: "",
      room_no: "",
      degree_type: "",
      bits_email: "",
      yearOfStudy: 2019,
      dualDegree: false,
      singleDegree: true,
      gender: "none"
    };
    this.yearOfStudy = this.yearOfStudy.bind(this);
    this.gender = this.gender.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let usernameError = "";
    let emailError = "";
    let passwordError = "";
    let repeatpasswordError = "";

    if (!this.state.username) {
      usernameError = "username cannot be blank";
    }

    if (!this.state.email) {
      emailError = "email cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "password cannot be blank";
    }

    if (this.state.password !== this.state.repeatpassword) {
      repeatpasswordError = "must be same";
      this.setState(repeatpasswordError);
      return false;
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (emailError || usernameError || passwordError) {
      this.setState({ emailError, usernameError, passwordError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    // const isValid = this.validate();
    let authData;
    // if (isValid) {
    let isDualDegree = this.state.dualDegree;
    console.log(this.state);
    if (!isDualDegree) {
      authData = {
        name: this.state.fullName,
        gender: this.state.gender,
        username: this.state.username,
        password: this.state.repeatpassword,
        email: this.state.email,
        phone: this.state.phoneNumber,
        bits_id: this.state.bits_id,
        hostel: this.state.hostel,
        room_no: this.state.roomNo,
        is_dual_degree: "",
        single_branch: this.state.branch
      };
    } else {
      authData = {
        name: this.state.fullName,
        gender: this.state.gender,
        username: this.state.username,
        password: this.state.repeatpassword,
        email: this.state.email,
        phone: this.state.phoneNumber,
        bits_id: this.state.bits_id,
        hostel: this.state.hostel,
        room_no: this.state.roomNo,
        is_dual_degree: true,
        dual_branch: this.state.branch
      };
      // }
      // console.log(authData);
    }
    // console.log(this.state);
    if (
      this.state.isPasswordCorrect ||
      this.state.isPasswordCorrect === "none"
    ) {
      axios
        .post("https://market.bits-dvm.org/api/auth/signup/", authData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          alert(response.data.display_message);
        })
        .catch(error => {
          alert(error.response.data.display_message);
        });
    } else {
      alert("password and repeat password do not match");
    }
  };
  yearOfStudy = e => {
    // console.log(e.target.value);
    this.setState({ yearOfStudy: parseInt(e.target.value) }, function() {
      console.log(this.state.yearOfStudy);
      if (this.state.yearOfStudy !== 2019 && this.state.dualDegree) {
        this.setState({
          singleDegree: true,
          dualDegree: true
        });
      } else {
        if (this.state.yearOfStudy === 2019 && this.state.dualDegree) {
          this.setState({
            singleDegree: false,
            dualDegree: true
          });
        }
      }
    });
  };

  selectedHostel = e => {
    this.setState({
      hostel: e.target.value,
      function() {
        console.log(this.state.hostel);
      }
    });
  };

  showBothBranch = e => {
    if (e.target.value === "Single Degree") {
      this.setState({
        singleDegree: true,
        dualDegree: false
      });
    } else if (e.target.value === "Dual Degree") {
      if (this.state.yearOfStudy === 2019) {
        this.setState({
          singleDegree: false,
          dualDegree: true
        });
      } else {
        this.setState({
          singleDegree: true,
          dualDegree: true
        });
      }
    } else {
    }
  };
  gender = e => {
    switch (e.target.value) {
      case "Male":
        this.setState({
          gender: "M"
        });
      case "Female":
        this.setState({
          gender: "F"
        });
      default:
        this.setState({
          gender: "M"
        });
    }
    console.log(this.state);
  };

  render() {
    let enabled;
    if (this.state.gender === "none") {
      enabled = true;
    } else {
      enabled = false;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Tell Us About Yourself</h1>
                    <p className="text-muted">
                      Please fill all mentioned fields
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        autoComplete="username"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <FormGroup>
                      <div
                        style={{ paddingLeft: "50px" }}
                        onChange={this.gender}
                      >
                        <CustomInput
                          inline
                          type="radio"
                          name="customRadio"
                          value="Male"
                          id="exampleCustomRadio"
                          label="Male"
                          onChange={this.gender}
                        />
                        <CustomInput
                          inline
                          type="radio"
                          name="customRadio"
                          value="Female"
                          id="exampleCustomRadio2"
                          label="Female"
                          onChange={this.gender}
                        />
                      </div>
                    </FormGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="call" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        name="phone_no"
                        id="exampleNumber"
                        placeholder="Phone number"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="calendar" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                        type="select"
                        id="exampleCustomSelect"
                        name="year of study"
                        onChange={this.yearOfStudy}
                      >
                        <option value="">Select your year of study</option>
                        <option>2019</option>
                        <option>2018</option>
                        <option>2017</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                      </CustomInput>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="home" />
                        </InputGroupText>
                      </InputGroupAddon>

                      {this.state.gender === "Male" ? (
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          disabled={enabled}
                          onChange={this.selectedHostel}
                        >
                          <option value="">Select your Hostel.</option>
                          <option>Ram Bhawan</option>
                          <option>Budh Bhawan</option>
                          <option>Srinivasa Ramanujan A</option>
                          <option>Srinivasa Ramanujan B</option>
                          <option>Srinivasa Ramanujan C</option>
                          <option>Srinivasa Ramanujan D</option>
                          <option>Krishna Bhawan</option>
                          <option>Gandhi Bhawan</option>
                          <option>Shankar Bhawan</option>
                          <option>Vyas Bhawan</option>
                          <option>Vishwakarma Bhawan</option>
                          <option>Bhagirath Bhawan</option>
                          <option>Rana Pratap Bhawan</option>
                          <option>Ashok Bhawan</option>
                          <option>Malviya Bhawan A</option>
                          <option>Malviya Bhawan B</option>
                          <option>Malviya Bhawan C</option>
                        </CustomInput>
                      ) : (
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          disabled={enabled}
                          onChange={this.selectedHostel}
                        >
                          <option value="">Select your Hostel.</option>
                          <option>Meera Block 1</option>
                          <option>Meera Block 2</option>
                          <option>Meera Block 3</option>
                          <option>Meera Block 4</option>
                          <option>Meera Block 5</option>
                          <option>Meera Block 6</option>
                          <option>Meera Block 7</option>
                          <option>Meera Block 8</option>
                          <option>Meera Block 9</option>
                          <option>Meera Block 10</option>
                        </CustomInput>
                      )}
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="home" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        name="room_no"
                        id="exampleNumber"
                        placeholder="Enter Room No"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="book" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                        type="select"
                        id="exampleCustomSelect"
                        name="customSelect"
                        onChange={this.showBothBranch}
                      >
                        <option value="">Choose your degree type</option>
                        <option>Single Degree</option>
                        <option>Dual Degree</option>
                      </CustomInput>
                    </InputGroup>
                    {this.state.singleDegree ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          onChange={this.handleChange}
                        >
                          <option>Enter your Single Degree Branch.</option>
                          <option value="A1">A1 - B.E. Chemical</option>
                          <option value="A2">A2 - B.E. Civil</option>
                          <option value="A3">
                            A3 - B.E. Electrical and Electronics
                          </option>
                          <option value="A4">A4 - B.E. Mechanical</option>
                          <option value="A5">A5 - B.Pharma</option>
                          <option value="A7">A7 - B.E. Computer Science</option>
                          <option value="A8">
                            A8 - B.E. Electronics and Instrumentation
                          </option>
                          <option value="AB">AB - B.E. Manufacturing</option>
                        </CustomInput>
                      </InputGroup>
                    ) : null}

                    {this.state.dualDegree ? (
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="git-branch" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                          type="select"
                          id="exampleCustomSelect"
                          name="customSelect"
                          onChange={this.handleChange}
                        >
                          <option>Enter your Dual Branch.</option>
                          <option value="B1">
                            B1 - M.Sc. Biological Sciences
                          </option>
                          <option value="B2">B2 - M.Sc. Chemistry</option>
                          <option value="B3">B3 - M.Sc. Economics</option>
                          <option value="B4">B4 - M.Sc. Mathematics</option>
                          <option value="B5">B5 - M.Sc. Physics</option>
                        </CustomInput>
                      </InputGroup>
                    ) : null}

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="pricetag" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="bits_email"
                        placeholder="BITS ID"
                        autoComplete="BitsId"
                      />
                    </InputGroup>

                    <Button color="success" block onClick={this.handleSubmit}>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
