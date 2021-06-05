/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router,
         Switch, Route } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

//First Party Imports
import { IElevatedPageState } from "./Interfaces/PageState";
import { Register } from "./Modules/User/Register";
import { Login } from "./Modules/User/Login";
import { ForgotPassword } from "./Modules/User/ForgotPassword";
import { NavBar } from "./Components/Navbar/Navbar";
import { Load } from "./Modules/Load/Load"
import { Train } from "./Modules/Train/Train";
import { AdvancedTrain } from "./Modules/Train/AdvancedTrain";
import { Inference } from "./Modules/Inference/Inference";
import { Home } from "./Modules/Home";
import { Button } from "./Components/Button/Button";
import { useAuthenticate } from "./Hooks/Authenticate";
import { defaultShiftTitle, pageTitles } from "./constants"
import { ShiftPage } from "./Modules/ShiftPage"
import { UserPage } from "./Modules/User/UserPage"


export default function App() {
  const [elevatedState, setElevatedState] = useState<IElevatedPageState>({
    msg: "",
    error: null,
    authenticated: false,
    username: "",
    defaultTrainView: "basic",
    shiftUUID: "",
    shiftTitle: defaultShiftTitle,
    trainStatusInterval: 10,
    usePTM: false,
    prebuiltShiftModel: "",
  })

  const getElevatedState = function(){ return elevatedState };

  const [showMsg, setShowMsg] = useState(false);

  const [fetching, setFetching] = useState(true)
  
    
  const auth = useAuthenticate(setFetching, setElevatedState)

  useEffect(() => {
    document.title = pageTitles[""]
    setElevatedState({...elevatedState, shiftUUID: sessionStorage.getItem("shiftUUID")!})
  }, [])

  useEffect(() => {
    if(!fetching) return;
    auth()
  }, [fetching]);

  useEffect(() => {
    if(!elevatedState.msg) return;

    setShowMsg(true);
  }, [elevatedState.msg]);

  useEffect(() => {
    if(!elevatedState.shiftUUID) return;

    sessionStorage.setItem("shiftUUID", elevatedState.shiftUUID);
  }, [elevatedState.shiftUUID]);

  useEffect(() => {
    if(!elevatedState.username) return;

    sessionStorage.setItem("username", elevatedState.username);
  }, [elevatedState.username]);

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
                  <Register elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/login">
                  <Login elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/forgotPassword">
                  <ForgotPassword elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/load">
                  <Load elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/train">
                  <Train elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/advancedTrain">
                  <AdvancedTrain elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/inference">
                  <Inference elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/shift/:uuid">
                  <ShiftPage elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/user/:username">
                  <UserPage elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route exact path="/">
                  <Home elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
              </Switch>

            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
