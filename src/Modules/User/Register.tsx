//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { IElevatedPageState } from "../../Interfaces/PageState";


export const Register = (props: IElevatedPageState) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    const requestOptions: RequestInit = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password, email: email})
    };
    
    if(password === confirmPassword){
      fetch(`/api/users/register`, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
        props.setMsg(data.msg);
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
            <h2>Sign Up</h2>
          </Row>

          <br/>

          <Row>
            <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="text" placeholder="Username" onBlur={(event) => setUsername(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="email" placeholder="Email" onBlur={(event) => setEmail(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
          </Row>
          <Row>
            <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" placeholder="Confirm Password" onBlur={(event) => setConfirmPassword(event.target.value)}/>
          </Row>

          <Row className="align-items-center">
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button className="p-2 mt-4 mb-2 borderRadius-2 w-100" onClick={registerUser}>Register &#10140;</Button>
            </Col>
            <Col xs={2}></Col>
          </Row>

          <br/>
        </Col>
        <Col xs={3}></Col>
      </Row>

      <Row className="mt-auto mb-3">
        <Col xs={4}></Col>
        <Col xs={4}>
          <Link to="/login" className="w-100">
            <Button className="p-2 mb-2 borderRadius-2 w-100">Already Have An Account?</Button>
          </Link>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
}