import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Register = () => {
  const API_URL_BASE = 'http://127.0.0.1:5000'

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const registerUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password, email: email, remember: true})
    };
    
    fetch(`${API_URL_BASE}/api/users/register`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
    });
  }

  return (
    <Container>
      <Row>
        <input type="text" name="username" className="neumorphic textbox" placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/>
      </Row>
      <Row>
        <input type="email" name="email" className="neumorphic textbox" placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/>
      </Row>
      <Row>
        <input type="password" name="password" className="neumorphic textbox" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
      </Row>
      <Row>
        <input type="password" name="passwordConf" className="neumorphic textbox" placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
      </Row>
      <Row>
        <Col xs={10}>
          <button className="neumorphic" onClick={registerUser}>Sign Up</button>
        </Col>
        <Col xs={2}>
          <input type="checkbox"/>
        </Col>
      </Row>
    </Container>
  );
}