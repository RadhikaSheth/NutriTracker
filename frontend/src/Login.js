import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
let isValid = true;
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            formErrors: {},
            username: "",
            password: "",
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
        let fieldValidationErrors = this.state.formErrors

        if (this.state.username === "") {
            isValid = false
            fieldValidationErrors.username = 'Enter your username';
        } else {
            fieldValidationErrors.username = '';
        }
        if (this.state.password === "") {
            isValid = false
            fieldValidationErrors.password = 'Enter your password';
        } else {
            fieldValidationErrors.password = '';
        }
    }
    handleSubmit() {

        this.props.onAuth(this.state.username, this.state.password);

    }
    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>Username or Password not correct</p>
            );
        }
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <Container fluid >
                    <Row xs={1} md={2}>
                        <Col style={{ textAlign: "center", marginTop: "20%" }}>
                            <h2 style={{ color: "green" }}><b>NUTRI TRACKER</b></h2>

                        </Col>
                        <Col style={{ marginTop: "11%", display: "flex", justifyContent: "center" }} >
                            <Form style={{ width: "90%", padding: "20px", backgroundColor: "#f8f8ff" }}>

                                <h4 style={{ textAlign: "center" }}>LOGIN</h4>
                                <br />
                                <Form.Group>
                                    <Form.Label>UserName</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Enter UserName" onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.username}</div>
                                    <br />
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Enter Password" onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.formErrors.password}</div>
                                    <div style={{ color: 'red' }}>{errorMessage}</div>
                                    <br />
                                    <Button variant="outline-dark" style={{ width: "150px" }} onClick={this.handleSubmit.bind(this)}>
                                        Login
                                    </Button>
                                    &nbsp;
                                    <Button variant="outline-dark" style={{ width: "150px" }} href="/signup">
                                        Signup
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);