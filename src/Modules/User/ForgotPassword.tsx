//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { IElevatedPageState } from "../../Interfaces/PageState";
import { useFetch } from "../../Helpers/Fetch";


interface resetPasswordRequestReturn {
  msg: string
}


export function ForgotPassword (props: {elevatedState: () => IElevatedPageState, setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>}){
  const {elevatedState, setElevatedState, ...navProps} = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fetching, setFetching] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<resetPasswordRequestReturn>();

  let requestOptions: RequestInit = {};


  const apiFetch = useFetch(setFetching, setElevatedState, setRegisterResponse, `/api/users/resetPassword`, () => requestOptions, registerResponse)

  useEffect(() => {
    if(fetching) return;

    if (password !== confirmPassword){
      setElevatedState((prev) => ({...prev, msg: "Passwords do not match"}));
      setFetching(false)
      return;
    }

    requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({currentPassword: currentPassword, password: password})
    };

    apiFetch()
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

          <Row>
            <TextBox className="m-2 p-2 borderRadius-2 w-100" type="password" placeholder="Current Password" onBlur={(event) => setCurrentPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className="m-2 p-2 borderRadius-2 w-100" type="password" placeholder="New Password" onBlur={(event) => setPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className="m-2 p-2 borderRadius-2 w-100" type="password" placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
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