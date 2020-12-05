import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Login = () => {
  const API_URL_BASE = 'http://127.0.0.1:5000'

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password, email: email, remember: true})
    };
    
    fetch(`${API_URL_BASE}/api/users/login`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
    });
  }

  return (
    <Container>
      <Row>
        <input type="text" name="username" className="neumorphic textbox" placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/><br/>
      </Row>
      <Row>
        <input type="email" name="email" className="neumorphic textbox" placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/><br/>
      </Row>
      <Row>
        <input type="password" name="password" className="neumorphic textbox" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/><br/>
      </Row>
      <Row>
        <Col sm={8}>
          <button className="neumorphic" onClick={registerUser}>Login</button>
        </Col>
        <Col sm={4}>
          <input type="checkbox"/>
        </Col>
      </Row>
    </Container>
  );
}