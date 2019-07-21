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
import axios from "axios";

// import { redirectTo } from "@reach/router";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatpassword: "",
  usernameError: "",
  emailError: "",
  passwordError: "",
  repeatpasswordError: "",
  redirectToDashboard: true
};

class Register extends Component {
  state = initialState;
  constructor(props) {
    super(props);
    this.state = {
      yearOfStudy: 2019,
      dualDegree: false,
      singleDegree: true,
      gender: "none"
    };
    this.yearOfStudy = this.yearOfStudy.bind(this);
    this.gender = this.gender.bind(this);
    this.handleBranch = this.handleBranch.bind(this);
    this.handleHostel = this.handleHostel.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    },console.log(this.state));
    // console.log(event.target.value);
  };

  handleBranch = event =>{
    let branch;
    switch(event.target.value){
      case "A1 - B.E. Chemical":
      branch = "A1";
      break;
      case "A2 - B.E. Civil":
      branch = "A2";
      break;
      case "A3 - B.E. Electrical and Electronics":
      branch = "A3";
      break;
      case "A4 - B.E. Mechanical":
      branch = "A4";
      break;
      case "A5 - B.Pharma":
      branch = "A5";
      break;
      case "A7 - B.E. Computer Science":
      branch = "A7";
      break;
      case "A8 - B.E. Electronics and Instrumentation":
      branch = "A8";
      break;
      case "AB - B.E. Manufacturing":
      branch = "AB";
      break;
      case "B1 - M.Sc. Biological Sciences":
      branch = "B1";
      break;
      case "B2 - M.Sc. Chemistry":
      branch = "B2";
      break;
      case "B3 - M.Sc. Economics":
      branch = "B3";
      break;
      case "B4 - M.Sc. Mathematics":
      branch = "B4";
      break;
      case "B5 - M.Sc. Physics":
      branch = "B5";
      break;
      default:
      branch ="none";
      break; 
    }
    this.setState({
      branch:branch
    });
  }

  handleHostel = event =>{
    let hostel;
    switch(event.target.value){
      case "Ram Bhawan":
      hostel = "RM";
      break;
      case "Budh Bhawan":
      hostel = "BUDH";
      break;
      case "Srinivasa Ramanujan A":
      hostel = "SR-A";
      break;
      case "Srinivasa Ramanujan B":
      hostel = "SR-B";
      break;
      case "Srinivasa Ramanujan C":
      hostel = "SR-C";
      break;
      case "Srinivasa Ramanujan D":
      hostel = "SR-D";
      break;
      case "Krishna Bhawan":
      hostel = "KR";
      break;
      case "Gandhi Bhawan":
      hostel = "GN";
      break;
      case "Shankar Bhawan":
      hostel = "SK";
      break;
      case "Vyas Bhawan":
      hostel = "VY";
      break;
      case "Vishwakarma Bhawan":
      hostel = "VK";
      break;
      case "Bhagirath Bhawan":
      hostel = "BG";
      break;
      case "Rana Pratap Bhawan":
      hostel = "RP";
      break;
      case "Ashok Bhawan":
      hostel = "AK";
      break;
      case "Malviya Bhawan A":
      hostel = "MV-A";
      break;
      case "Malviya Bhawan B":
      hostel = "MV-B";
      break;
      case "Malviya Bhawan C":
      hostel = "MV-C";
      break;
      case "Meera Block 1":
      hostel = "MR-1";
      break;
      case "Meera Block 2":
      hostel = "MR-2";
      break;
      case "Meera Block 3":
      hostel = "MR-3";
      break;
      case "Meera Block 4":
      hostel = "MR-4";
      break;
      case "Meera Block 5":
      hostel = "MR-5";
      break;
      case "Meera Block 6":
      hostel = "MR-6";
      break;
      case "Meera Block 7":
      hostel = "MR-7";
      break;
      case "Meera Block 8":
      hostel = "MR-8";
      break;
      case "Meera Block 9":
      hostel = "MR-9";
      break;
      case "Meera Block 10":
      hostel = "MR-10";
      break;
      default:
      hostel="none";
      break;
    }
    this.setState({
      hostel: hostel
    });
  }

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
      let gender;
      if(this.state.gender === "Male"){
        gender="M";
      }else{
        gender="F"; 
      }
      let isDualDegree = this.state.dualDegree;

      if(!isDualDegree){
        authData = {
          name: this.state.fullName,
          gender: gender,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phoneNumber,
          bits_id: this.state.bitsId,
          hostel: this.state.hostel,
          room_no: this.state.roomNo,
          is_dual_degree: "",
          single_branch: this.state.branch
        }
      }else{
        authData = {
          name: this.state.fullName,
          gender: gender,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phoneNumber,
          bits_id: this.state.bitsId,
          hostel: this.state.hostel,
          room_no: this.state.roomNo,
          is_dual_degree: true,
          single_branch: this.state.branch
        }
      // }

    };
      // console.log(this.state);
      axios
        .post("https://market.bits-dvm.org/api/auth/signup/", authData)
        .then(response => {
          console.log("Signed Up!");
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      // clear form
      this.setState(initialState);
    };

  yearOfStudy = e => {
    // console.log(e.target.value);
    this.setState({ yearOfStudy: e.target.value }, function() {
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
    }
  };

  gender = e => {
    if (e.target.value === "Male"){
      this.setState({
        gender: "Male"
      });
    } else {
      this.setState({
        gender: "Female"
      });
    }
  };

  render() {
    let enabled;
    if(this.state.gender==="none")
    {enabled= true;
    }
    else{
      enabled=false;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">
                      Create your account - <b>for 2019 batch only</b>. All
                      other batches are required to login via BITS email
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        autoComplete="username"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="person" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="username"
                        placeholder="User name"
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
                          value="Male"
                          id="exampleCustomRadio"
                          name="customRadio"
                          label="Male"
                        />
                        <CustomInput
                          inline
                          type="radio"
                          value="Female"
                          id="exampleCustomRadio2"
                          name="customRadio"
                          label="Female"
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
                        name="phoneNumber"
                        id="exampleNumber"
                        placeholder="Phone number"
                        onChange = {this.handleChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="mail" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="finger-print" size="small" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="done-all" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="repeatpassword"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        // onChange={this.handleChange}
                      />
                    </InputGroup>
                    {/*                     
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <ion-icon name="calendar"></ion-icon>
                          </InputGroupText>
                      </InputGroupAddon>
                      <CustomInput
                      type="select"
                      id="exampleCustomSelect"
                      name="year of study"
                      onChange={this.yearOfStudy}
                      >
                       <option value="" >Select your year of study</option> 
                      <option>2019</option>
                      </CustomInput>
                    </InputGroup> */}

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
                          name="hostel" 
                          disabled ={enabled}
                          onChange = {this.handleHostel}
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
                          name="hostel"
                          disabled ={enabled}
                          onChange = {this.handleHostel}
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
                        name="roomNo"
                        id="exampleNumber"
                        placeholder="Enter Room No"
                        onChange = {this.handleChange}
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
                          name="branch"
                          onChange = {this.handleBranch}
                        >
                          <option value="">
                            Enter your Single Degree Branch.
                          </option>
                          <option>A1 - B.E. Chemical</option>
                          <option>A2 - B.E. Civil</option>
                          <option>A3 - B.E. Electrical and Electronics</option>
                          <option>A4 - B.E. Mechanical</option>
                          <option>A5 - B.Pharma</option>
                          <option>A7 - B.E. Computer Science</option>
                          <option>
                            A8 - B.E. Electronics and Instrumentation
                          </option>
                          <option>AB - B.E. Manufacturing</option>
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
                          name="branch"
                          onChange = {this.handleBranch}
                        >
                          <option value="">Enter your Dual Branch.</option>
                          <option>B1 - M.Sc. Biological Sciences</option>
                          <option>B2 - M.Sc. Chemistry</option>
                          <option>B3 - M.Sc. Economics</option>
                          <option>B4 - M.Sc. Mathematics</option>
                          <option>B5 - M.Sc. Physics</option>
                        </CustomInput>
                      </InputGroup>
                    ) : null}
                    
                     <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <ion-icon name="pricetag"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="bitsId"
                        placeholder="BITS ID"
                        autoComplete="BitsId"
                        onChange= {this.handleChange}
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
