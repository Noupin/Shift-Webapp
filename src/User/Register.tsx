import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
        <input type="text" className="neumorphic textbox" placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/>
      </Row>
      <Row>
        <input type="email" className="neumorphic textbox" placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/>
      </Row>
      <Row>
        <input type="password" className="neumorphic textbox" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
      </Row>
      <Row>
        <input type="password" className="neumorphic textbox" placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
      </Row>
      <Row>
        <Col xs={10}>
          <button className="neumorphic" onClick={registerUser}>Sign Up</button>
        </Col>
        <Col xs={2}>
          <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(!rememberMe)}/>
        </Col>
      </Row>
    </Container>
  );
}