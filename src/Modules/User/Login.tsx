//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { Checkbox } from '../../Components/Checkbox/Checkbox';


export const Login = () => {

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const registerUser = () => {
    const requestOptions: RequestInit = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ usernameOrEmail: usernameOrEmail, password: password, remember: rememberMe})
    };
    
    fetch(`/api/users/login`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
    });
  }

  return (
    <Container>
      <Row>
        <TextBox type="text" placeholder="Username/Email" onBlur={(event) => setUsernameOrEmail(event.target.value)}/>
      </Row>
      <Row>
       <TextBox type="password" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
      </Row>
      <Row>
        <Col xs={10}>
          <Button onClick={registerUser}>Login</Button>
        </Col>
        <Col xs={2}>
          <Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
        </Col>
      </Row>
    </Container>
  );
}