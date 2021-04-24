import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import axios from "axios";
let isValid = true;
class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            formErrors: {},
            username: "",
            email: "",
            age: "",
            gender: "Male",
            password1: "",
            password2: "",
        }
    }
    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({
            [key]: value
        },
            () => { this.validateField(key, value) }
        );
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        if (this.state.username === "") {
            isValid = false
            fieldValidationErrors.username = 'Enter your username';
        }
        if (typeof this.state.username !== "undefined") {
            const regex = /^[\w.@+-\s]+$/
            if (this.state.username.length > 150 || !regex.test(this.state.username)) {
                isValid = false;
                fieldValidationErrors.username = 'Username should be 150 characters or fewer. Only Letters, digits and @/./+/-/_  valid';
            } else {

            }
        }
        if (this.state.email === "") {
            isValid = false;
            fieldValidationErrors.email = 'Enter your Email';
        }

        if (typeof this.state.email !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                isValid = false;
                fieldValidationErrors.email = "Please enter valid email address.";
            } else {
                fieldValidationErrors.email = ''
            }
        }
        if (typeof this.state.age !== "undefined") {
            if (this.state.age >= 10 && this.state.age <= 70) {
                fieldValidationErrors.age = ''
            } else {
                fieldValidationErrors.age = 'Age should be between 10 -70'
            }
        }

        if (this.state.password1 === "") {
            isValid = false;
            fieldValidationErrors.password1 = 'Enter the password'
        }

        if (this.state.password2 === "") {
            isValid = false;
            fieldValidationErrors.password1 = 'Enter the confirm password'
        }

        if (typeof this.state.password1 !== "undefined") {
            if (this.state.password1.length < 8) {
                isValid = false;
                fieldValidationErrors.password1 = 'Password length should be greater than 8';
            } else {
                fieldValidationErrors.password1 = '';
            }
        }

        if (typeof this.state.password1 !== "undefined" && typeof this.state.password2 !== "undefined") {

            if (this.state.password1 !== this.state.password2) {
                isValid = false;
                fieldValidationErrors.password2 = 'Passwords dont match!';
            } else {
                fieldValidationErrors.password2 = '';
            }
        }

        this.setState({
            formErrors: fieldValidationErrors,
            formValid: this.state.nameValid
        });
    }
    handleSubmit() {

        this.props.onAuth(
            this.state.username,
            this.state.email,
            this.state.password1,
            this.state.password2
        );
        axios.post('http://127.0.0.1:8000/api/createUser/',
            {
                uname: this.state.username,
                age: this.state.age,
                gender: this.state.gender,
            },
        )
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                // console.log(error);
            });

    }
    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>Check all the fields again!</p>
            );
        }
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                
                <Container fluid >
                    <Row xs={1} md={2}>
                        <Col style={{ textAlign: "center", marginTop: "20%" }}>
                            <h2 style={{ color: "green" }}><b>NUTRI TRACKER</b></h2>
                        </Col>
                        <Col style={{ marginTop: "5%", display: "flex", justifyContent: "center" }} >
                            <Form style={{ width: "90%", padding: "20px", backgroundColor: "#f8f8ff" }} >
                                <h4 style={{ textAlign: "center" }}>SIGN UP</h4>
                                <br />
                                <Form.Group>
                                    <Form.Label>UserName</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Enter UserName" onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.username}</div>
                                    <br />
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" placeholder="Enter UserName" onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.email}</div>
                                    <br />
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="text" name="age" placeholder="Enter age" onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.age}</div>
                                    <br />
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        value="Male"
                                        checked={this.state.gender === "Male"}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        value="Female"
                                        checked={this.state.gender === "Female"}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <br />
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password1" placeholder="Enter Password" onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.password1}</div>
                                    <br />
                                    <Form.Label>Confirm Password </Form.Label>
                                    <Form.Control type="password" name="password2" placeholder="Enter Password Again" onChange={this.handleChange.bind(this)} />
                                    <br />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.password2}</div>
                                    <br />
                                    
                                    <div style={{ color: 'red' }}>{errorMessage}</div>
                                    <Button variant="outline-dark" style={{ width: "150px" }} onClick={this.handleSubmit.bind(this)}>
                                        Signup
                                    </Button>
                                    &nbsp;
                                    <Button variant="outline-dark" style={{ width: "150px" }} href="/">
                                        Login
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);