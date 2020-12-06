import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
        <input type="text" className="neumorphic textbox" placeholder="Username/Email" onBlur={(event) => setUsernameOrEmail(event.target.value)}/><br/>
      </Row>
      <Row>
        <input type="password" className="neumorphic textbox" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/><br/>
      </Row>
      <Row>
        <Col sm={8}>
          <button className="neumorphic" onClick={registerUser}>Login</button>
        </Col>
        <Col sm={4}>
        <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(!rememberMe)}/>
        </Col>
      </Row>
    </Container>
  );
}