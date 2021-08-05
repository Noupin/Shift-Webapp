/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';

//First Party Imports
import { pageTitles } from '../../constants';
import { useFetch } from '../../Hooks/Fetch';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { VerifyEmailChangeRequest, VerifyEmailChangeResponse } from '../../Swagger';


export function VerifyEmailChange(props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const { token } = useParams<{token: string | undefined}>()

  const [fetching, setFetching] = useState(true);
  const [verifyChangeEmailResponse, setVerifyChangeEmailResponse] = useState<VerifyEmailChangeResponse>();
  const fetchVerifyEmailChange = useFetch(elevatedState().APIInstances.User,
                                           elevatedState().APIInstances.User.verifyEmailChange,
                                           elevatedState, setElevatedState, setVerifyChangeEmailResponse,
                                           setFetching)


  useEffect(() => {
    document.title = pageTitles["verifyEmailChange"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    const requestParams: VerifyEmailChangeRequest  = {
      token: token!
    }

    fetchVerifyEmailChange(requestParams)
  }, [fetching]);

  useEffect(() => {
    if(!verifyChangeEmailResponse) return;

    setElevatedState(prev => ({...prev, msg: verifyChangeEmailResponse.msg!}))
  }, [verifyChangeEmailResponse])


  return (
    <Container>
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            {verifyChangeEmailResponse ?
            <h2>{verifyChangeEmailResponse.confirmed ?
            `You have an email waiting for you at your new email: ${verifyChangeEmailResponse.nextEmail}` :
            `Sending confirmation email...`}</h2> :
            <h2>Sorry the link was either changed or it took to much time to confirm your new email.</h2>}
          </Row>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
}