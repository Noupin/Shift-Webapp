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
import { ChangePasswordOperationRequest, ChangePasswordRequest, ChangePasswordResponse } from '../../Swagger';


export function ChangePassword (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props
  const history = useHistory()

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePasswordErrors, setChangePasswordErrors] = useState({
    currentPassword: false,
    password: false,
    confirmPassword: false
  })
  const [changePasswordErrorMessage, setChangePasswordErrorMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [changePasswordResponse, setChangePasswordResponse] = useState<ChangePasswordResponse>();
  const fetchChangeUserPassword = useFetch(elevatedState().APIInstaces.User,
                                           elevatedState().APIInstaces.User.changePassword,
                                           setElevatedState, setChangePasswordResponse,
                                           setFetching)

  useEffect(() => {
    document.title = pageTitles["changePassword"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    setChangePasswordErrors({
      currentPassword: false,
      password: false,
      confirmPassword: false
    })
    setChangePasswordErrorMessage("")

    if (password !== confirmPassword){
      setChangePasswordErrors(prev => ({...prev, confirmPassword: true}))
      setChangePasswordErrorMessage("Passwords do not match");
      setFetching(false)
      return;
    }

    const requestBody: ChangePasswordRequest = {
      currentPassword: currentPassword,
      newPassword: password
    }

    const requestParams: ChangePasswordOperationRequest = {
      body: requestBody
    }

    fetchChangeUserPassword(requestParams)
  }, [fetching]);

  useEffect(() => {
    if(!changePasswordResponse) return;

    if(changePasswordResponse.currentPasswordMessage){
      setChangePasswordErrors(prev => ({...prev, currentPassword: true}))
      setChangePasswordErrorMessage(changePasswordResponse.currentPasswordMessage)
    }

    if(changePasswordResponse.newPasswordMessage){
      setChangePasswordErrors(prev => ({...prev, password: true}))
      setChangePasswordErrorMessage(changePasswordResponse.newPasswordMessage)
    }

    if (changePasswordResponse!.complete){
      history.push("/")
    }
  }, [changePasswordResponse])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Alert show={changePasswordErrorMessage !== ""} variant="danger">
        <Row className="flex-grow-1">
          <Col xs={9}>{changePasswordErrorMessage}</Col>
          <Col xs={3}>
            <Button className="borderRadius-2 p-2 w-100" onClick={() => {
              setChangePasswordErrorMessage("")
              }}>Close</Button>
          </Col>
        </Row>
      </Alert>

      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Change Password</h2>
          </Row>

          <br/>

          <Row>
            <TextBox className={`m-2 p-2 borderRadius-2 w-100 ${changePasswordErrors.currentPassword ? "alert-danger":""}`}
              type="password" autoComplete="current-password" placeholder="Current Password"
              onChange={(event) => setCurrentPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className={`m-2 p-2 borderRadius-2 w-100 ${changePasswordErrors.password ? "alert-danger":""}`}
              type="password" autoComplete="new-password" placeholder="New Password"
              onChange={(event) => setPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className={`m-2 p-2 borderRadius-2 w-100 ${changePasswordErrors.confirmPassword ? "alert-danger":""}`}
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