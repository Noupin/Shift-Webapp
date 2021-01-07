//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { IElevatedPageState } from "../../Interfaces/PageState";
import { useFetch } from "../../Hooks/Fetch";
import { useAuthentication } from "../../Hooks/Authenticated";


interface loginRequestReturn {
  msg: string
}

let loginResponse: loginRequestReturn = {msg: ""}


export const Login = (props: IElevatedPageState) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isAuthenticated, authenticate] = useAuthentication()
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(loginResponse);

  async function loginUser() {
    const requestOptions: RequestInit = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({usernameOrEmail: usernameOrEmail,
                            password: password,
                            remember: rememberMe})
    };
    
    apiFetch(`/api/users/login`, requestOptions)
    props.setMsg(apiResponse.msg)

    authenticate()
    props.setAuthenticated(isAuthenticated)
  }

    
  useEffect(() => {
    console.error(apiError)
  }, [apiError]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Login</h2>
          </Row>

          <br/>

          <Row>
            <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="text" placeholder="Username/Email" onBlur={(event) => setUsernameOrEmail(event.target.value)}/>
          </Row>
          <Row>
           <TextBox className="p-2 mt-2 mb-2 borderRadius-2 w-100" type="password" placeholder="Password" onBlur={(event) => setPassword(event.target.value)}/>
          </Row>

          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Button className="p-2 mt-4 mb-2 borderRadius-2 w-100" onClick={loginUser} disabled={apiLoading}>Login &#10140;</Button>
            </Col>
            <Col xs={2}></Col>
          </Row>

          <br/>

          <Row className="align-items-center">
            <Col xs={1}></Col>
            <Col xs={3} className="pr-1 text-right">
              Remember Me
            </Col>
            <Col xs={1} className="p-2">
              <Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
            </Col>
            <Col xs={2}></Col>
            <Col xs={1}></Col>
            <Col xs={3}>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </Col>
            <Col xs={1}></Col>
          </Row>

          <br/>
        </Col>
        <Col xs={3}></Col>
      </Row>

      <Row className="mt-auto mb-3">
        <Col xs={4}></Col>
        <Col xs={4}>
          <Link to="/register" className="w-100">
            <Button className="p-2 mb-2 borderRadius-2 w-100">Don't Have An Account?</Button>
          </Link>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
}