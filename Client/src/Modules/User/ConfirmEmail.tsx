/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { pageTitles } from '../../constants';
import { useFetch } from '../../Hooks/Fetch';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ConfirmEmailRequest, ConfirmEmailResponse } from '../../Swagger';


export function ConfirmEmail(props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const history = useHistory();
  const { token } = useParams<{token: string | undefined}>()


  const [fetching, setFetching] = useState(true);
  const [confirmEmailResponse, setConfirmEmailResponse] = useState<ConfirmEmailResponse>();
  const fetchConfirmEmail = useFetch(elevatedState().APIInstances.Authenticate,
                                     elevatedState().APIInstances.Authenticate.confirmEmail,
                                     elevatedState, setElevatedState, setConfirmEmailResponse,
                                     setFetching)
  


  useEffect(() => {
    document.title = pageTitles["confirmEmail"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    const requestParams: ConfirmEmailRequest  = {
      token: token!
    }

    fetchConfirmEmail(requestParams)
  }, [fetching]);

  useEffect(() => {
    if(!confirmEmailResponse) return;

    setElevatedState(prev => ({...prev, msg: confirmEmailResponse.msg!}))
  }, [confirmEmailResponse])


  return (
    <Container>
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>{confirmEmailResponse?.confirmed ? "Email Confirmed!" : "Confirming Email"}</h2>
          </Row>

          {confirmEmailResponse?.confirmed &&
          <>
            <br/>
            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Button className="mt-3 m-2 p-2 borderRadius-2 w-100"
                  onClick={() => history.push('/')}>
                  Go Shift &#10140;
                </Button>
              </Col>
              <Col xs={2}></Col>
            </Row>
          </>}
        </Col>
        <Col xs={3}></Col>
      </Row>

    </Container>
  );
}