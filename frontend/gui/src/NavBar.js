import React from "react";
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">NutriTracker</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/input">Add Meal</Nav.Link>
                    <Nav.Link href="/stats">Get Nutri-Stats</Nav.Link>
                    <Nav.Link ></Nav.Link>
                </Nav>
                <Nav className="ml-auto mr-5">
                    <NavDropdown title={<b>Hey {localStorage.getItem('username')} !</b>} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={this.props.logout} href="/">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

            </Navbar>

        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NavBar));