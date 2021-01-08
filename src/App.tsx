//Third Party Imports
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router,
         Switch, Route } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

//First Party Imports
import { IElevatedPageState } from "./Interfaces/PageState";
import { IAuthRequestReturn } from "./Interfaces/Authenticate"
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
import { useAuthenticate } from "./Helpers/Authenticate";


export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [shiftUUID, setShiftUUID] = useState(sessionStorage.getItem('shiftUUID') || "");
  const [error, setError] = useState(new Error())
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const [fetching, setFetching] = useState(true)
  const [authenticatedResponse, setAuthenticatedResponse] = useState<IAuthRequestReturn>()

  const elevatedState: IElevatedPageState = {shiftUUID: () => shiftUUID,
                                         setShiftUUID: setShiftUUID,
                                         setMsg: setMsg,
                                         epochs: 10,
                                         user: "",
                                         authenticated: () => authenticated,
                                         setAuthenticated: setAuthenticated,
                                         setError: setError};
  
    
  const auth = useAuthenticate(setFetching, setError, setAuthenticatedResponse)

  useEffect(() => {
    if(!fetching) return;
    auth()
  }, [fetching]);

  useEffect(() => {
    if(!authenticatedResponse) return;
    setAuthenticated(authenticatedResponse!.authenticated)
  }, [authenticatedResponse]);

  useEffect(() => {
    if(!msg) return;

    setShowMsg(true);
  }, [msg]);

  useEffect(() => {
    if(!shiftUUID) return;
    sessionStorage.setItem("shiftUUID", shiftUUID);
  }, [shiftUUID]);

  useEffect(() => {
    if(!error) return;
    console.error(error);
  }, [error]);

  return (
    <Router>
      <Container fluid className="flex h-100">
        <Row className="justify-content-center h-100">
          <Col>
            <div className="h-100 d-flex flex-column">
              <Row className="justify-content-center">
                <NavBar {...elevatedState} key={`${authenticated}`}/>
              </Row>

              <Alert show={showMsg} variant="primary">
                <Row className="flex-grow-1">
                  <Col xs={9}>{msg}</Col>
                  <Col xs={3}>
                    <Button className="borderRadius-2 p-2 w-100" onClick={() => {setShowMsg(false);setMsg("")}}>Close</Button>
                  </Col>
                </Row>
              </Alert>

              <Switch>
                <Route path="/register">
                  <Register {...elevatedState}></Register>
                </Route>
                <Route path="/login">
                  <Login {...elevatedState}></Login>
                </Route>
                <Route path="/account">
                  <Account {...elevatedState}></Account>
                </Route>
                <Route path="/forgotPassword">
                  <ForgotPassword {...elevatedState}></ForgotPassword>
                </Route>
                <Route path="/load">
                  <Load {...elevatedState}></Load>
                </Route>
                <Route path="/train">
                  <Train {...elevatedState}></Train>
                </Route>
                <Route path="/advancedTrain">
                  <AdvancedTrain {...elevatedState}></AdvancedTrain>
                </Route>
                <Route path="/shift">
                  <Shift {...elevatedState}></Shift>
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