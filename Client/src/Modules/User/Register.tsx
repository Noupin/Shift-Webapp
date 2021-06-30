/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { AuthenticateAPIInstance } from '../../Helpers/Api';
import { Button } from '../../Components/Button/Button';
import { useAuthenticate } from '../../Hooks/Authenticate';
import { TextBox } from '../../Components/TextBox/TextBox';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { RegisterOperationRequest, RegisterRequest, RegisterResponse } from '../../Swagger';
import { pageTitles } from '../../constants';


export function Register (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>();
  const [authenticating, setAuthenticating] = useState(false);

  const history = useHistory();


  const auth = useAuthenticate(setAuthenticating, props.setElevatedState)


  useEffect(() => {
    document.title = pageTitles["register"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    setUsernameMessage("")
    setEmailMessage("")
    setPasswordMessage("")

    if (password !== confirmPassword){
      setPasswordMessage("Make sure your passwords match.")
      setFetching(false)

      return;
    }

    const registerReqeustParams: RegisterRequest = {
      username: username,
      password: password,
      email: email
    }
    const registerBody: RegisterOperationRequest = {
      body: registerReqeustParams
    }

    AuthenticateAPIInstance.register(registerBody).then((value) => {
      setRegisterResponse(value)
    })
    setFetching(false)
    setAuthenticating(true)
  }, [fetching]);

  useEffect(() => {
    if(!authenticating || !registerResponse) return;

    if(registerResponse.usernameMessage){
      setUsernameMessage(registerResponse.usernameMessage)
    }

    if(registerResponse.emailMessage){
      setEmailMessage(registerResponse.emailMessage)
    }

    if(registerResponse.passwordMessage){
      setPasswordMessage(registerResponse.passwordMessage)
    }

    setElevatedState((prev) => ({...prev, msg: registerResponse.msg!}))
    auth()
  }, [authenticating, registerResponse]);

  useEffect(() => {
    if(!elevatedState().authenticated) return;

    history.push("/")
  }, [elevatedState().authenticated]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Sign Up</h2>
          </Row>

          <br/>

          <form>
            <Row>
              <Col className="p-0">
                <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="text" autoComplete="username"
                         placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/>
                <p className="neumorphic borderRadius-2 p-2 mr-2"
                  style={{position: "absolute", right: "-25%", bottom: 0}}
                  hidden={usernameMessage === ""}>
                  {usernameMessage}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="p-0">
                <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="email" autoComplete="username"
                        placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/>
                <p className="neumorphic borderRadius-2 p-2 mr-2"
                  style={{position: "absolute", right: "-25%", bottom: 0}}
                  hidden={emailMessage === ""}>
                  {emailMessage}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="p-0">
                <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" autoComplete="new-password"
                        placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
                <p className="neumorphic borderRadius-2 p-2 mr-2"
                  style={{position: "absolute", right: "-25%", bottom: 0}}
                  hidden={passwordMessage === ""}>
                  {passwordMessage}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="p-0">
                <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" autoComplete="new-password"
                        placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
              </Col>
            </Row>
          </form>

          <Row className="align-items-center">
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button className="p-2 mt-4 mb-2 borderRadius-2 w-100" disabled={fetching || authenticating} onClick={() => {setFetching(true)}}>Register &#10140;</Button>
            </Col>
            <Col xs={2}></Col>
          </Row>

          <br/>
        </Col>
        <Col xs={3}></Col>
      </Row>

      <Row className="mt-auto mb-3">
        <Col xs={4}></Col>
        <Col xs={4}>
          <Link to="/login" className="w-100">
            <Button className="p-2 mb-2 borderRadius-2 w-100">Already Have An Account?</Button>
          </Link>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
}