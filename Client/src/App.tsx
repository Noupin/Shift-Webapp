/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,
         Switch, Route } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

//First Party Imports
import { IElevatedPageState } from "./Interfaces/PageState";
import { Register } from "./Modules/User/Register";
import { Login } from "./Modules/User/Login";
import { ChangePassword } from "./Modules/User/ChangePassword";
import { NavBar } from "./Components/Navbar/Navbar";
import { Load } from "./Modules/Load/Load";
import { Train } from "./Modules/Train/Train";
import { Inference } from "./Modules/Inference/Inference";
import { Home } from "./Modules/Home";
import { Button } from "./Components/Button/Button";
import { useAuthenticate } from "./Hooks/Authenticate";
import { defaultShiftTitle, pageTitles } from "./constants";
import { ShiftPage } from "./Modules/ShiftPage";
import { UserPage } from "./Modules/User/UserPage";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { ResetPassword } from './Modules/User/ResetPassword';
import { Settings } from './Modules/Settings';
import './App.scss';
import { ForgotPassword } from './Modules/User/ForgotPassword';


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
    trainingShift: false,
    canTrain: false,
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
                <ProtectedRoute expression={getElevatedState().authenticated} path="/change-password">
                  <ChangePassword elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <Route path="/forgot-password">
                  <ForgotPassword elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/reset-password/:token">
                  <ResetPassword elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <ProtectedRoute expression={getElevatedState().authenticated} path="/load">
                  <Load elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <ProtectedRoute expression={getElevatedState().canTrain} path="/train">
                  <Train elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <ProtectedRoute expression={getElevatedState().authenticated} path="/inference">
                  <Inference elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <Route path="/shift/:uuid">
                  <ShiftPage elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/user/:username">
                  <UserPage elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/settings">
                  <Settings elevatedState={getElevatedState} setElevatedState={setElevatedState}/>
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
