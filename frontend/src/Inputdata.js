import React from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
toast.configure()

class Input extends React.Component {
    constructor() {
        super();
        this.state = {
            foodDish: "",
        }
    }
    submitData() {
        axios.post('http://127.0.0.1:8000/api/create/',
            {
                foodDish: this.state.foodDish,
            },
            { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
        )
            .then(response => {
                this.setState({
                    foodDish: "",
                })
                toast("MEAL ADDED!", {
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(function (error) {
                toast("Add a valid Food dish!", {
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }
    handleChange(event) {
        event.preventDefault();
        const key = event.target.name;
        const value = event.target.value;
        this.setState({ [key]: value });
    }
    handleSubmit() {
        this.submitData();

    }
    render() {
        return (
            <>
                <Container fluid>
                    <Row style={{ display: "flex", justifyContent: "center", marginTop: "7%" }}>
                        <h3 style={{ color: "green" }}><b>ADD MEAL</b></h3>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                        <Form style={{ width: "50%", padding: "20px", backgroundColor: "#f8f8ff" }}>
                            <Form.Group>
                                <Form.Label>FoodDish</Form.Label>
                                <Form.Control type="text" name="foodDish" placeholder="Enter Dish Name" value={this.state.foodDish} onChange={this.handleChange.bind(this)} />
                                <br />
                                <Button variant="outline-dark" style={{ width: "150px" }} onClick={this.handleSubmit.bind(this)} >
                                    Submit
                                    </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                </Container>
            </>
        )
    }

}
export default Input;