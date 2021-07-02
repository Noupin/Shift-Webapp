/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { pageTitles } from '../../constants';
import { UserAPIInstance } from '../../Helpers/Api';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ResetPasswordOperationRequest, ResetPasswordRequest, ResetPasswordResponse } from '../../Swagger';


export function ResetPassword (props: IElevatedStateProps){
  const history = useHistory()
  const { token } = useParams<{token: string | undefined}>()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPasswordErrors, setResetPasswordErrors] = useState({
    password: false,
    confirmPassword: false
  })
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [resetPasswordResponse, setResetPasswordResponse] = useState<ResetPasswordResponse>();


  useEffect(() => {
    document.title = pageTitles["resetPassword"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    setResetPasswordErrors({
      password: false,
      confirmPassword: false
    })
    setResetPasswordErrorMessage("")

    async function resetPassword(){
      if (password !== confirmPassword){
        setResetPasswordErrors(prev => ({...prev, confirmPassword: true}))
        setResetPasswordErrorMessage("Passwords do not match");
        setFetching(false)
  
        return;
      }

      const requestBody: ResetPasswordRequest = {
        password: password
      }
  
      const requestParams: ResetPasswordOperationRequest = {
        token: token!,
        body: requestBody
      }

      const response = await UserAPIInstance.resetPassword(requestParams)
      setResetPasswordResponse(response)

      setFetching(false)

      if (response.complete){
        history.push("/login")
      }
    }

    resetPassword()
  }, [fetching]);

  useEffect(() => {
    if(!resetPasswordResponse) return;

    if(resetPasswordResponse.newPasswordMessage){
      setResetPasswordErrors(prev => ({...prev, password: true}))
      setResetPasswordErrorMessage(resetPasswordResponse.newPasswordMessage)
    }
  }, [resetPasswordResponse])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Alert show={resetPasswordErrorMessage !== ""} variant="danger">
        <Row className="flex-grow-1">
          <Col xs={9}>{resetPasswordErrorMessage}</Col>
          <Col xs={3}>
            <Button className="borderRadius-2 p-2 w-100" onClick={() => {
              setResetPasswordErrorMessage("")
              }}>Close</Button>
          </Col>
        </Row>
      </Alert>

      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Reset Password</h2>
          </Row>

          <br/>

          <Row>
            <TextBox className={`m-2 p-2 borderRadius-2 w-100 ${resetPasswordErrors.password ? "alert-danger":""}`}
              type="password" autoComplete="new-password" placeholder="New Password"
              onChange={(event) => setPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className={`m-2 p-2 borderRadius-2 w-100 ${resetPasswordErrors.confirmPassword ? "alert-danger":""}`}
              type="password" autoComplete="new-password" placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}/>
          </Row>

          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button className="mt-3 m-2 p-2 borderRadius-2 w-100" onClick={() => setFetching(true)}>Update &#10140;</Button>
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