/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { pageTitles } from '../../constants';
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface resetPasswordRequestReturn {
  msg: string
}


export function ChangePassword (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fetching, setFetching] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<resetPasswordRequestReturn>();

  const requestOptions = useRef<RequestInit>({});

  const fetchResetPassword = useFetch(setFetching, setElevatedState, setRegisterResponse, `/api/users/resetPassword`, () => requestOptions.current, registerResponse)


  useEffect(() => {
    document.title = pageTitles["changePassword"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    if (password !== confirmPassword){
      setElevatedState((prev) => ({...prev, msg: "Passwords do not match"}));
      setFetching(false)
      return;
    }

    requestOptions.current = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({currentPassword: currentPassword, password: password})
    };

    fetchResetPassword()
  }, [fetching]);

  useEffect(() => {
    if(!registerResponse) return;
  }, [registerResponse]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Reset Password</h2>
          </Row>

          <br/>

          <form>
            <Row>
              <TextBox className="m-2 p-2 borderRadius-2 w-100" type="password" autoComplete="current-password"
                       placeholder="Current Password" onChange={(event) => setCurrentPassword(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className="m-2 p-2 borderRadius-2 w-100" type="password" autoComplete="new-password"
                       placeholder="New Password" onChange={(event) => setPassword(event.target.value)}/>
            </Row>
            <Row>
              <TextBox className="m-2 p-2 borderRadius-2 w-100" type="password" autoComplete="new-password"
                       placeholder="Confirm Password" onChange={(event) => setConfirmPassword(event.target.value)}/>
            </Row>

            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Button className="mt-3 m-2 p-2 borderRadius-2 w-100" onClick={() => setFetching(true)}>Update &#10140;</Button>
              </Col>
              <Col xs={2}></Col>
            </Row>
          </form>

          <br/>
        </Col>
        <Col xs={3}></Col>
      </Row>

    </Container>
  );
}