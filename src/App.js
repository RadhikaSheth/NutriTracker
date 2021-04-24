import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import * as actions from './store/actions/auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import GetStats from "./GetStats";
import Input from "./Inputdata";
import Login from "./Login";
import SignUp from "./SignUp";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ?
          <Router>
            <NavBar {...this.props} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/stats" component={GetStats} />
              <Route path="/input" component={Input} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Home} />
            </Switch>
          </Router>

          :
          <>

            <Router>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Login} />
            </Router>
          </>
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);