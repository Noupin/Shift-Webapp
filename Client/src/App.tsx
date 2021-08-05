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
import { Home } from "./Modules/Home/Home";
import { Button } from "./Components/Button/Button";
import { defaultShiftTitle, pageTitles } from "./constants";
import { ShiftPage } from "./Modules/ShiftPage";
import { UserPage } from "./Modules/User/UserPage";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { ResetPassword } from './Modules/User/ResetPassword';
import { Settings } from './Modules/User/Settings';
import { ForgotPassword } from './Modules/User/ForgotPassword';
import { currentUser, setCurrentUser, isAuthenticated, setAuthenticated } from './Helpers/User';
import { isTokenExpired } from './Helpers/Token';
import { ApiInstances } from './Helpers/Api';
import { useRefresh } from './Hooks/Refresh';
import { getFrontEndSettings, setFrontEndSettings } from './Helpers/FrontEndSettings';
import { ConfirmEmail } from './Modules/User/ConfirmEmail';
import { ResendConfirmEmail } from './Modules/User/ResendConfirmEmail';
import { VerifyEmailChange } from './Modules/User/VerifyEmailChange';
import { ConfirmEmailChange } from './Modules/User/ConfirmEmailChange';
import './App.scss';


export default function App() {
  const [elevatedState, setElevatedState] = useState<IElevatedPageState>({
    msg: "",
    error: null,
    authenticated: false,
    shiftUUID: "",
    shiftTitle: defaultShiftTitle,
    trainStatusInterval: 10,
    prebuiltShiftModel: "",
    accessToken: "",
    APIInstances: new ApiInstances(""),
    frontEndSettings: getFrontEndSettings(),
  })

  const [showMsg, setShowMsg] = useState(false);
  const fetchRefresh = useRefresh(setElevatedState)


  useEffect(() => {
    document.title = pageTitles[""]
    setElevatedState(prev => ({...prev, shiftUUID: sessionStorage.getItem("shiftUUID")!}))
  }, [])

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

  useEffect(() => {
    if(!elevatedState.accessToken || elevatedState.accessToken.split('.').length < 3){
      setElevatedState(prev => ({...prev, authenticated: false}))
      elevatedState.APIInstances.apiKey = ""
      setAuthenticated(false)
      return;
    }
    

    const JWTBody = JSON.parse(atob(elevatedState.accessToken.split('.')[1]))
    if(JWTBody.user){
      setCurrentUser(JWTBody.user);
      if(!JWTBody.user.confirmed){
        setElevatedState(prev => ({...prev, msg: "Please confirm your account."}))
      }
    }

    elevatedState.APIInstances.apiKey = elevatedState.accessToken
    var authenticated = isTokenExpired(elevatedState.accessToken)
    setAuthenticated(authenticated)
    setElevatedState(prev => ({...prev,
                               authenticated: authenticated}))
  }, [elevatedState.accessToken])

  useEffect(() => {
    if(elevatedState.authenticated) return;

    fetchRefresh()
  }, [elevatedState.authenticated])

  useEffect(() => {
    if(!elevatedState.frontEndSettings) return;

    setFrontEndSettings(elevatedState.frontEndSettings)
  }, [elevatedState.frontEndSettings])


  return (
    <Router>
      <Container fluid className="flex h-100 textColor w-100 p-0" dark-mode={elevatedState.frontEndSettings.darkMode.toString()}>
        <Row className="justify-content-center h-100 m-0 w-100">
          <Col className="p-0 w-100 expandingColumn">
            <div className="h-100 d-flex flex-column w-100">
              <Row className="justify-content-center w-100 m-0">
                <NavBar elevatedState={elevatedState} setElevatedState={setElevatedState}/>
              </Row>

              <Alert show={showMsg} variant="primary" className="w-100">
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
                <Route path="/register/:redirect?">
                  <Register elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/login/:redirect?">
                  <Login elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <ProtectedRoute key={elevatedState.authenticated.toString()}
                  expression={isAuthenticated()} path="/change-password">
                  <ChangePassword elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <Route path="/forgot-password">
                  <ForgotPassword elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/reset-password/:token">
                  <ResetPassword elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <ProtectedRoute key={elevatedState.authenticated.toString()}
                  expression={isAuthenticated()} path="/load">
                  <Load elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <ProtectedRoute expression={currentUser().canTrain!} path="/train">
                  <Train elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <ProtectedRoute key={elevatedState.authenticated.toString()}
                  expression={isAuthenticated()} path="/inference">
                  <Inference elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <Route path="/shift/:uuid">
                  <ShiftPage elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/user/:username">
                  <UserPage elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/settings">
                  <Settings elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/confirm-email/:token">
                  <ConfirmEmail elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/resend-confirmation-email">
                  <ResendConfirmEmail elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/verify-email-change/:token">
                  <VerifyEmailChange elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/confirm-email-change/:token">
                  <ConfirmEmailChange elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route exact path="/">
                  <Home elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </Route>
                <Route path="/">
                  EROR
                </Route>
              </Switch>

            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
