//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';


export const ForgotPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    const requestOptions: RequestInit = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({password: password})
    };
    
    if(password === confirmPassword){
        fetch(`/api/users/resetPassword`, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
        });
    }
    else{
        console.log("Passwords do not match");
    }
  }

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
            <TextBox type="password" placeholder="New Password" onBlur={(event) => setPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox type="password" placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
          </Row>

          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button onClick={registerUser}>Update &#10140;</Button>
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