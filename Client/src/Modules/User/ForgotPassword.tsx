/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { TextBox } from '../../Components/TextBox/TextBox';
import { pageTitles } from '../../constants';
import { UserAPIInstance } from '../../Helpers/Api';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ForgotPasswordOperationRequest, ForgotPasswordRequest } from '../../Swagger';


export function ForgotPassword (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailing, setEmailing] = useState(false);


  useEffect(() => {
    document.title = pageTitles["forgotPassword"]
  }, [])

  useEffect(() => {
    if(!emailing) return;

    async function forgotPassword(){
      const requestBody: ForgotPasswordRequest = {
        email: email
      }
  
      const requestParams: ForgotPasswordOperationRequest = {
        body: requestBody
      }

      const response = await UserAPIInstance.forgotPassword(requestParams)
      setElevatedState(prev => ({...prev, msg: response.msg!}))

      setEmailing(false)

      if(response.complete){
        history.push("/")
      }
    }

    forgotPassword()
  }, [emailing]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>Forgot Password</h2>
          </Row>

          <br/>

            <Row>
              <TextBox className="m-2 p-2 borderRadius-2 w-100" type="email" autoComplete="username"
                       placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
            </Row>

            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Button className="mt-3 m-2 p-2 borderRadius-2 w-100"
                  onClick={() => setEmailing(true)}>
                  Email Me &#10140;
                </Button>
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