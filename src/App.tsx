//Third Party Imports
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router,
         Switch, Route } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

//First Party Imports
import { IElevatedPageState } from "./Interfaces/PageState";
import { Register } from "./Modules/User/Register";
import { Login } from "./Modules/User/Login";
import { Account } from './Modules/User/Account';
import { ForgotPassword } from "./Modules/User/ForgotPassword";
import { NavBar } from "./Components/Navbar/Navbar";
import { Load } from "./Modules/Load/Load"
import { Train } from "./Modules/Train/Train";
import { AdvancedTrain } from "./Modules/Train/AdvancedTrain";
import { Shift } from "./Modules/Shift/Shift";
import { Button } from "./Components/Button/Button";
import { useAuthentication } from "./Hooks/Authenticated"


export default function App() {
  const [isAuthenticated, authenticate, checkingAuthentication] = useAuthentication()

  const [authenticated, setAuthenticated] = useState(false)
  const [shiftUUID, setShiftUUID] = useState(sessionStorage.getItem('shiftUUID') || "");

  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(true);

  const pageState: IElevatedPageState = {shiftUUID: shiftUUID,
                                         setShiftUUID: setShiftUUID,
                                         setMsg: setMsg,
                                         epochs: 10,
                                         user: "",
                                         authenticated: authenticated,
                                         setAuthenticated: setAuthenticated};

  useEffect(() => {
    async function checkAuthentication() {
      await authenticate()
      console.log(isAuthenticated)
      setAuthenticated(isAuthenticated)
    }

    checkAuthentication()
  }, []);

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
                <NavBar {...pageState} key={`${authenticated}`}/>
              </Row>

              <Alert show={showMsg} variant="primary">
                <Row className="flex-grow-1">
                  <Col xs={9}>{msg}</Col>
                  <Col xs={3}>
                    <Button className="borderRadius-2 p-2 w-100" onClick={() => setShowMsg(false)}>Close</Button>
                  </Col>
                </Row>
              </Alert>

              <Switch>
                <Route path="/register">
                  <Register {...pageState}></Register>
                </Route>
                <Route path="/login">
                  <Login {...pageState}></Login>
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