/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
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
  const {elevatedState} = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerErrors, setResigterErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  const [registerErrorMessage, setResgisterErrorMessage] = useState("");

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

    async function register(){
      setResigterErrors({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
      })
      setResgisterErrorMessage("")

      if (password !== confirmPassword){
        setResigterErrors(prev => ({...prev, confirmPassword: true}))
        setResgisterErrorMessage("Make sure your passwords match.")
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
  
      await AuthenticateAPIInstance.register(registerBody).then((value) => {
        setRegisterResponse(value)
      })
      setFetching(false)
      setAuthenticating(true)
    }

    register()
  }, [fetching]);

  useEffect(() => {
    if(!authenticating || !registerResponse) return;

    if(registerResponse.usernameMessage){
      setResigterErrors(prev => ({...prev, username: true}))
      setResgisterErrorMessage(registerResponse.usernameMessage)
    }

    if(registerResponse.emailMessage){
      setResigterErrors(prev => ({...prev, email: true}))
      setResgisterErrorMessage(registerResponse.emailMessage)
    }

    if(registerResponse.passwordMessage){
      setResigterErrors(prev => ({...prev, password: true}))
      setResgisterErrorMessage(registerResponse.passwordMessage)
    }

    auth()
  }, [authenticating, registerResponse]);

  useEffect(() => {
    if(!elevatedState().authenticated) return;

    history.push("/")
  }, [elevatedState().authenticated]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Alert show={registerErrorMessage !== ""} variant="danger">
        <Row className="flex-grow-1">
          <Col xs={9}>{registerErrorMessage}</Col>
          <Col xs={3}>
            <Button className="borderRadius-2 p-2 w-100" onClick={() => {
              setResgisterErrorMessage("")
              }}>Close</Button>
          </Col>
        </Row>
      </Alert>

      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Sign Up</h2>
          </Row>

          <br/>

          <form>
            <Row>
              <TextBox className={`p-2 mt-2 mb-2 borderRadius-2 w-100 ${registerErrors.username ? "alert-danger":""}`}
                type="text" autoComplete="username" placeholder="Username"
                onBlur={(event) => setUsername(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className={`p-2 mt-2 mb-2 borderRadius-2 w-100 ${registerErrors.email ? "alert-danger":""}`}
                type="email" autoComplete="username" placeholder="Email"
                onBlur={(event) => setEmail(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className={`p-2 mt-2 mb-2 borderRadius-2 w-100 ${registerErrors.password ? "alert-danger":""}`}
                type="password" autoComplete="new-password" placeholder="Password"
                onBlur={(event) => setPassword(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className={`p-2 mt-2 mb-2 borderRadius-2 w-100 ${registerErrors.confirmPassword ? "alert-danger":""}`}
                type="password" autoComplete="new-password" placeholder="Confirm Password"
                onBlur={(event) => setConfirmPassword(event.target.value)}/>
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