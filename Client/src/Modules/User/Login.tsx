/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { AuthenticateAPIInstance } from '../../Helpers/Api';
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { useAuthenticate } from '../../Hooks/Authenticate';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { LoginResponse, LoginRequest, LoginOperationRequest } from '../../Swagger';
import { pageTitles } from '../../constants';


export function Login (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loginErrors, setLoginErrors] = useState({
    username: false,
    password: false
  })
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [loginResponse, setLoginResponse] = useState<LoginResponse>();
  const [authenticating, setAuthenticating] = useState(false);

  const history = useHistory();

  const auth = useAuthenticate(setAuthenticating, setElevatedState);


  useEffect(() => {
    document.title = pageTitles["login"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    setLoginErrors({
      username: false,
      password: false
    })
    setLoginErrorMessage("")

    async function login(){
      const loginRequestParams: LoginRequest = {
        usernameOrEmail: usernameOrEmail,
        password: password,
        remember: rememberMe
      }
      const loginBody: LoginOperationRequest = {
        body: loginRequestParams
      }
  
      await AuthenticateAPIInstance.login(loginBody).then((value) => {
        setLoginResponse(value)
      })
      setFetching(false)
      setAuthenticating(true)
    }

    login()
  }, [fetching]);

  useEffect(() => {
    if(!authenticating || !loginResponse) return;

    if(loginResponse.usernameMessage){
      setLoginErrors(prev => ({...prev, username: true}))
      setLoginErrorMessage(loginResponse.usernameMessage)
    }

    if(loginResponse.passwordMessage){
      setLoginErrors(prev => ({...prev, password: true}))
      setLoginErrorMessage(loginResponse.passwordMessage)
    }

    auth()
  }, [authenticating, loginResponse]);

  useEffect(() => {
    if(!elevatedState().authenticated) return;

    history.push("/")
  }, [elevatedState().authenticated]);



  return (
    <Container className="d-flex justify-content-center h-100 flex-column fullScreen">
      <Alert show={loginErrorMessage !== ""} variant="danger">
        <Row className="flex-grow-1">
          <Col xs={9}>{loginErrorMessage}</Col>
          <Col xs={3}>
            <Button className="borderRadius-2 p-2 w-100" onClick={() => {
              setLoginErrorMessage("")
              }}>Close</Button>
          </Col>
        </Row>
      </Alert>

      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Login</h2>
          </Row>

          <br/>

          <form>
            <Row>
              <TextBox className={`p-2 mt-2 mb-2 borderRadius-2 w-100 ${loginErrors.username ? "alert-danger":""}`}
                type="text" placeholder="Username/Email" autoComplete="username"
                onChange={(event) => setUsernameOrEmail(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className={`p-2 mt-2 mb-2 borderRadius-2 w-100 ${loginErrors.password ? "alert-danger":""}`}
                type="password" placeholder="Password" autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}/>
            </Row>

            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Button type="submit" className="p-2 mt-4 mb-2 borderRadius-2 w-100"
                        disabled={fetching || authenticating} onClick={() => setFetching(true)}>
                  Login &#10140;
                </Button>
              </Col>
              <Col xs={2}>
              </Col>
            </Row>
          </form>

          <br/>

          <Row className="align-items-center">
            <Col xs={1}></Col>
            <Col xs={3} className="pr-1 text-right">
              Remember Me
            </Col>
            <Col xs={1} className="p-2">
              <Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
            </Col>
            <Col xs={2}></Col>
            <Col xs={1}></Col>
            <Col xs={3}>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </Col>
            <Col xs={1}></Col>
          </Row>

          <br/>
        </Col>
        <Col xs={3}></Col>
      </Row>

      <Row className="mt-auto mb-3">
        <Col xs={4}></Col>
        <Col xs={4}>
          <Link to="/register" className="w-100">
            <Button className="p-2 mb-2 borderRadius-2 w-100">Don't Have An Account?</Button>
          </Link>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
}