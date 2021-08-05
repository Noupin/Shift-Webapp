/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { pageTitles } from '../../constants';
import { useFetch } from '../../Hooks/Fetch';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ForgotPasswordOperationRequest, ForgotPasswordRequest, ForgotPasswordResponse } from '../../Swagger';


export function ForgotPassword (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const history = useHistory();

  const [email, setEmail] = useState("");

  const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
    email: false
  })
  const [forgotPasswordErrorMessage, setForgotPasswordErrorMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [forgotPasswordResponse, setForgotPasswordResponse] = useState<ForgotPasswordResponse>();
  const fetchForgotUserPassword = useFetch(elevatedState.APIInstances.User,
                                           elevatedState.APIInstances.User.forgotPassword,
                                           elevatedState, setElevatedState, setForgotPasswordResponse,
                                           setFetching)
  


  useEffect(() => {
    document.title = pageTitles["forgotPassword"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    setForgotPasswordErrors({ email: false })
    setForgotPasswordErrorMessage("")

    const requestBody: ForgotPasswordRequest = {
      email: email
    }

    const requestParams: ForgotPasswordOperationRequest = {
      body: requestBody
    }

    fetchForgotUserPassword(requestParams)
  }, [fetching]);

  useEffect(() => {
    if(!forgotPasswordResponse) return;

    setElevatedState(prev => ({...prev, msg: forgotPasswordResponse.msg!}))

    if(forgotPasswordResponse.emailMessage){
      setForgotPasswordErrors({ email: true })
      setForgotPasswordErrorMessage(forgotPasswordResponse.emailMessage)
    }

    if(forgotPasswordResponse.complete){
      history.push("/")
    }
  }, [forgotPasswordResponse])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Alert show={forgotPasswordErrorMessage !== ""} variant="danger">
        <Row className="flex-grow-1">
          <Col xs={9}>{forgotPasswordErrorMessage}</Col>
          <Col xs={3}>
            <Button className="borderRadius-2 p-2 w-100" onClick={() => {
              setForgotPasswordErrorMessage("")
              }}>Close</Button>
          </Col>
        </Row>
      </Alert>

      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Forgot Password</h2>
          </Row>

          <br/>

            <Row>
              <TextBox className={`m-2 p-2 borderRadius-2 w-100 ${forgotPasswordErrors.email ? "alert-danger":""}`}
                type="email" autoComplete="username" placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}/>
            </Row>

            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Button className="mt-3 m-2 p-2 borderRadius-2 w-100"
                  onClick={() => setFetching(true)}>
                  Email Me &#10140;
                </Button>
              </Col>
              <Col xs={2}></Col>
            </Row>

          <br/>
        </Col>
        <Col xs={3}></Col>
      </Row>

    </Container>
  );
}