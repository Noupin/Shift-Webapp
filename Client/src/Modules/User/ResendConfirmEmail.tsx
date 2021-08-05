/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { pageTitles } from '../../constants';
import { useFetch } from '../../Hooks/Fetch';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ResendConfirmEmailResponse } from '../../Swagger';


export function ResendConfirmEmail(props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;


  const [fetching, setFetching] = useState(true);
  const [resendConfirmEmailResponse, setResendConfirmEmailResponse] = useState<ResendConfirmEmailResponse>();
  const fetchResendConfirmEmail = useFetch(elevatedState().APIInstances.Authenticate,
                                           elevatedState().APIInstances.Authenticate.resendConfirmEmail,
                                           elevatedState, setElevatedState, setResendConfirmEmailResponse,
                                           setFetching)


  useEffect(() => {
    document.title = pageTitles["resendConfirmEmail"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    fetchResendConfirmEmail()
  }, [fetching]);

  useEffect(() => {
    if(!resendConfirmEmailResponse) return;

    setElevatedState(prev => ({...prev, msg: resendConfirmEmailResponse.msg!}))
  }, [resendConfirmEmailResponse])


  return (
    <Container>
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>{resendConfirmEmailResponse ? "There is a surpise in your email for you!" : "Resending Confirmation Email..."}</h2>
          </Row>
        </Col>
        <Col xs={3}></Col>
      </Row>

    </Container>
  );
}