/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,
         Switch, Route } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

//First Party Imports
import { Button, ProtectedRoute } from '@noupin/feryv-components';
import { IElevatedState } from "./Interfaces/ElevatedState";
import { NavBar } from "./Components/Navbar/Navbar";
import { Load } from "./Modules/Load/Load";
import { Train } from "./Modules/Train/Train";
import { Inference } from "./Modules/Inference/Inference";
import { Home } from "./Modules/Home/Home";
import { defaultShiftTitle, pageTitles } from "./constants";
import { ShiftPage } from "./Modules/ShiftPage";
import { UserPage } from "./Modules/User/UserPage";
import { Settings } from './Modules/User/Settings';
import { currentUser, setCurrentUser, isAuthenticated, setAuthenticated } from './Helpers/User';
import { isTokenExpired } from './Helpers/Token';
import { ApiInstances } from './Helpers/Api';
import { makeRefresh } from './Hooks/Refresh';
import { makeFetch } from './Hooks/Fetch';
import { getFrontEndSettings, setFrontEndSettings } from './Helpers/FrontEndSettings';
import './App.scss';
import { IndividualUserGetResponse } from './Swagger';
import { makeLogout } from './Hooks/Logout';


export default function App() {
  const [elevatedState, setElevatedState] = useState<IElevatedState>({
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
  const [userGetResponse, setUserGetResponse] = useState<IndividualUserGetResponse>()

  const useRefresh = makeRefresh({setter: setElevatedState})
  const useFetch = makeFetch({setter: setElevatedState})
  makeLogout({setter: setElevatedState})

  const fetchRefresh = useRefresh()
  const fetchGetUser = useFetch({
    thisArg: elevatedState.APIInstances.User,
    swaggerFunction: elevatedState.APIInstances.User.getIndivdualUser,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setUserGetResponse
  })


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
    if(!userGetResponse || !elevatedState.accessToken) return;

    const JWTBody = JSON.parse(atob(elevatedState.accessToken.split('.')[1]))
    if(JWTBody.user && userGetResponse){
      setCurrentUser({...JWTBody.user, ...userGetResponse});
      if(!JWTBody.user.confirmed){
        setElevatedState(prev => ({...prev, msg: "Please confirm your account."}))
      }
    }

    setCurrentUser(userGetResponse.user!)
  }, [userGetResponse]);

  useEffect(() => {
    if(!elevatedState.accessToken || elevatedState.accessToken.split('.').length < 3){
      setElevatedState(prev => ({...prev, authenticated: false}))
      elevatedState.APIInstances.apiKey = ""
      setAuthenticated(false)
      return;
    }

    const JWTBody = JSON.parse(atob(elevatedState.accessToken.split('.')[1]))
    fetchGetUser({username: JWTBody.user.username})

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
                <ProtectedRoute RouteInstance={Route} key={elevatedState.authenticated.toString()}
                  condition={isAuthenticated()} path="/load">
                  <Load elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <ProtectedRoute RouteInstance={Route} condition={currentUser().canTrain!} path="/train"
                  key={currentUser().canTrain ? currentUser().canTrain!.toString() : ""}>
                  <Train elevatedState={elevatedState} setElevatedState={setElevatedState}/>
                </ProtectedRoute>
                <ProtectedRoute RouteInstance={Route} key={elevatedState.authenticated.toString()}
                  condition={isAuthenticated()} path="/inference">
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
