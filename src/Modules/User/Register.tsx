/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Button } from '../../Components/Button/Button';
import { useAuthenticate } from '../../Hooks/Authenticate';
import { TextBox } from '../../Components/TextBox/TextBox';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { AuthenticatedResponse, RegisterOperationRequest, RegisterRequest, RegisterResponse } from '../../Swagger';


export function Register (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fetching, setFetching] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>();
  const [authenticating, setAuthenticating] = useState(false);
  const [authenticatedResponse, setAuthenticatedResponse] = useState<AuthenticatedResponse>();

  const history = useHistory();


  const auth = useAuthenticate(setAuthenticating, props.setElevatedState, setAuthenticatedResponse)


  useEffect(() => {
    if(!fetching) return;

    if (password !== confirmPassword){
      setElevatedState((prev) => ({...prev, msg: "Passwords do not match"}))
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

    UserAPIInstance.register(registerBody).then((value) => {
      setRegisterResponse(value)
    })
    setFetching(false)
    setAuthenticating(true)
  }, [fetching]);

  useEffect(() => {
    if(!authenticating || !registerResponse) return;

    setElevatedState((prev) => ({...prev, msg: registerResponse.msg!}))
    auth()
  }, [authenticating, registerResponse]);

  useEffect(() => {
    if(!authenticatedResponse) return;

    setElevatedState((prev) => ({...prev, authenticated: authenticatedResponse.authenticated}))
  }, [authenticatedResponse]);

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
              <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="text" autoComplete="username"
                       placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="email" autoComplete="username"
                       placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" autoComplete="new-password"
                       placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" autoComplete="new-password"
                       placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
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