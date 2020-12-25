//Third Party Imports
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router,
  Switch, Route, Link } from "react-router-dom";
import { Container, Nav, Row, Col } from "react-bootstrap";

//First Party Imports
import { Register } from "./Modules/User/Register";
import { Login } from "./Modules/User/Login";
import { Logout } from "./Modules/User/Logout";
import { Account } from './Modules/User/Account';
import { ForgotPassword } from "./Modules/User/ForgotPassword";
//import { Navbar } from "./Components/Navbar/Navbar";
import { Load } from "./Modules/Load/Load"


export default function App() {
  return (
    <Router>
      <Container fluid className="flex h-100">
        <Row className="justify-content-center h-100">
          <Col>
            <div className="h-100 d-flex flex-column">
              <Row className="justify-content-center">
                <h1>Navbar</h1>
              </Row>

              <Row className="justify-content-center">
                <Nav id="nav" variant="pills" defaultActiveKey="/">
                  <Nav.Item>
                    <Nav.Link >
                      <Link to="/">Home</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link >
                      <Link to="/register">Register</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>
                      <Link to="/login">Login</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>
                      <Link to="/logout">Logout</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>
                      <Link to="/account">Account</Link>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>


              <Row className="flex-grow-1">
                <Switch>
                  <Route path="/register">
                    <Register />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/logout">
                    <Logout />
                  </Route>
                  <Route path="/account">
                    <Account />
                  </Route>
                  <Route path="/forgotPassword">
                    <ForgotPassword />
                  </Route>
                  <Route path="/load">
                    <Load />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}