/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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

    setUsernameMessage("")
    setPasswordMessage("")

    const loginRequestParams: LoginRequest = {
      usernameOrEmail: usernameOrEmail,
      password: password,
      remember: rememberMe
    }
    const loginBody: LoginOperationRequest = {
      body: loginRequestParams
    }

    AuthenticateAPIInstance.login(loginBody).then((value) => {
      setLoginResponse(value)
    })
    setFetching(false)
    setAuthenticating(true)
  }, [fetching]);

  useEffect(() => {
    if(!authenticating || !loginResponse) return;

    if(loginResponse.usernameMessage){
      setUsernameMessage(loginResponse.usernameMessage)
    }

    if(loginResponse.passwordMessage){
      setPasswordMessage(loginResponse.passwordMessage)
    }

    setElevatedState((prev) => ({...prev, msg: loginResponse.msg!}));
    auth()
  }, [authenticating, loginResponse]);

  useEffect(() => {
    if(!elevatedState().authenticated) return;

    history.push("/")
  }, [elevatedState().authenticated]);



  return (
    <Container className="d-flex justify-content-center h-100 flex-column fullScreen">
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Login</h2>
          </Row>

          <br/>

          <form>
            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="text"
                          placeholder="Username/Email" autoComplete="username"
                          onChange={(event) => setUsernameOrEmail(event.target.value)}/>
              </Col>
              <Col xs={2}>
              <p className="neumorphic borderRadius-2 p-2 mr-2"
                  style={{position: "absolute", right: "-25%", top: 0, bottom: 0}}
                  hidden={usernameMessage === ""}>
                  {usernameMessage}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password"
                          placeholder="Password" autoComplete="current-password"
                          onChange={(event) => setPassword(event.target.value)}/>
                <p className="neumorphic borderRadius-2 p-2 mr-2"
                  style={{position: "absolute", right: "-25%", top: 0, bottom: 0}}
                  hidden={passwordMessage === ""}>
                  {passwordMessage}
                </p>
              </Col>
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