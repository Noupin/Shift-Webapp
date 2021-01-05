//Third Party Imports
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router,
         Switch, Route, Link } from "react-router-dom";
import { Container, Nav, Row, Col, Alert } from "react-bootstrap";

//First Party Imports
import { Register } from "./Modules/User/Register";
import { Login } from "./Modules/User/Login";
import { Logout } from "./Modules/User/Logout";
import { Account } from './Modules/User/Account';
import { ForgotPassword } from "./Modules/User/ForgotPassword";
//import { Navbar } from "./Components/Navbar/Navbar";
import { Load } from "./Modules/Load/Load"
import { Train } from "./Modules/Train/Train";
import { AdvancedTrain } from "./Modules/Train/AdvancedTrain";
import { Shift } from "./Modules/Shift/Shift";
import { Button } from "./Components/Button/Button";
import { IElevatedPageState } from "./Interfaces/PageState";


export default function App() {
  const [shiftUUID, setShiftUUID] = useState(sessionStorage.getItem('shiftUUID') || "");

  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(true);

  const pageState: IElevatedPageState = {shiftUUID: shiftUUID, setShiftUUID: setShiftUUID, setMsg: setMsg};

  useEffect(() => {
    setShowMsg(true);
  }, [msg]);

  useEffect(() => {
    sessionStorage.setItem("shiftUUID", shiftUUID);
  }, [shiftUUID]);

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

              <Alert show={showMsg} variant="primary">
                <Row className="flex-grow-1">
                  <Col xs={9}>{msg}</Col>
                  <Col xs={3}>
                    <Button className="borderRadius-2 p-2" onClick={() => setShowMsg(false)}>Close</Button>
                  </Col>
                </Row>
              </Alert>

              <Row className="flex-grow-1">
                <Switch>
                  <Route path="/register">
                    <Register {...pageState}></Register>
                  </Route>
                  <Route path="/login">
                    <Login {...pageState}></Login>
                  </Route>
                  <Route path="/logout">
                    <Logout {...pageState}></Logout>
                  </Route>
                  <Route path="/account">
                    <Account {...pageState}></Account>
                  </Route>
                  <Route path="/forgotPassword">
                    <ForgotPassword {...pageState}></ForgotPassword>
                  </Route>
                  <Route path="/load">
                    <Load {...pageState}></Load>
                  </Route>
                  <Route path="/train">
                    <Train {...pageState}></Train>
                  </Route>
                  <Route path="/advancedTrain">
                    <AdvancedTrain {...pageState}></AdvancedTrain>
                  </Route>
                  <Route path="/shift">
                    <Shift {...pageState}></Shift>
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