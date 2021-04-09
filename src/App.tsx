/* eslint-disable react-hooks/exhaustive-deps */

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
import { useAuthenticate } from "./Helpers/AuthenticateUser";


export default function App() {
  const [elevatedState, setElevatedState] = useState<IElevatedPageState>({
    msg: "",
    error: new Error(),
    authenticated: false,
    user: "",
    defaultTrainView: "basic",
    shiftUUID: "",
    trainStatusInterval: 10,
    usePTM: false,
    prebuiltShiftModel: "",
  })

  const getElevatedState = function(){ return elevatedState };

  const [showMsg, setShowMsg] = useState(false);

  const [fetching, setFetching] = useState(true)
  const [authenticatedResponse, setAuthenticatedResponse] = useState<IAuthRequestReturn>()
  
    
  const auth = useAuthenticate(setFetching, setElevatedState, setAuthenticatedResponse)

  useEffect(() => {
    setElevatedState({...elevatedState, shiftUUID: sessionStorage.getItem("shiftUUID")!})
  }, [])

  useEffect(() => {
    if(!fetching) return;
    auth()
  }, [fetching]);

  useEffect(() => {
    if(!authenticatedResponse) return;
    setElevatedState({...elevatedState, authenticated: authenticatedResponse!.authenticated})
  }, [authenticatedResponse]);

  useEffect(() => {
    if(!elevatedState.msg) return;

    setShowMsg(true);
  }, [elevatedState.msg]);

  useEffect(() => {
    if(!elevatedState.shiftUUID) return;
    sessionStorage.setItem("shiftUUID", elevatedState.shiftUUID);
  }, [elevatedState.shiftUUID]);

  useEffect(() => {
    if(!elevatedState.error) return;
    console.error(elevatedState.error);
  }, [elevatedState.error]);

  return (
    <Router>
      <Container fluid className="flex h-100">
        <Row className="justify-content-center h-100">
          <Col>
            <div className="h-100 d-flex flex-column">
              <Row className="justify-content-center">
                <NavBar elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
              </Row>

              <Alert show={showMsg} variant="primary">
                <Row className="flex-grow-1">
                  <Col xs={9}>{elevatedState.msg}</Col>
                  <Col xs={3}>
                    <Button className="borderRadius-2 p-2 w-100" onClick={() => {
                      setShowMsg(false);
                      setElevatedState((prev) => ({...prev, msg: ""}))
                      }}>Close</Button>
                  </Col>
                </Row>
              </Alert>

              <Switch>
                <Route path="/register">
                  <Register elevatedState={getElevatedState} setElevatedState={setElevatedState}></Register>
                </Route>
                <Route path="/login">
                  <Login elevatedState={getElevatedState} setElevatedState={setElevatedState}></Login>
                </Route>
                <Route path="/account">
                  <Account elevatedState={getElevatedState} setElevatedState={setElevatedState}></Account>
                </Route>
                <Route path="/forgotPassword">
                  <ForgotPassword elevatedState={getElevatedState} setElevatedState={setElevatedState}></ForgotPassword>
                </Route>
                <Route path="/load">
                  <Load elevatedState={getElevatedState} setElevatedState={setElevatedState}></Load>
                </Route>
                <Route path="/train">
                  <Train elevatedState={getElevatedState} setElevatedState={setElevatedState}></Train>
                </Route>
                <Route path="/advancedTrain">
                  <AdvancedTrain elevatedState={getElevatedState} setElevatedState={setElevatedState}></AdvancedTrain>
                </Route>
                <Route path="/shift">
                  <Shift elevatedState={getElevatedState} setElevatedState={setElevatedState}></Shift>
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