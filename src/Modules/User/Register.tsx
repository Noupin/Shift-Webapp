//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { Checkbox } from '../../Components/Checkbox/Checkbox';


export const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const registerUser = () => {
    const requestOptions: RequestInit = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password, email: email, remember: rememberMe})
    };
    
    fetch(`/api/users/register`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
    });
  }

  return (
    <Container>
      <Row>
        <TextBox type="text" placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/>
      </Row>
      <Row>
        <TextBox type="email" placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/>
      </Row>
      <Row>
        <TextBox type="password" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
      </Row>
      <Row>
        <TextBox type="password" placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
      </Row>
      <Row>
        <Col xs={10}>
          <Button onClick={registerUser}>Sign Up</Button>
        </Col>
        <Col xs={2}>
          <Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
        </Col>
      </Row>
    </Container>
  );
}