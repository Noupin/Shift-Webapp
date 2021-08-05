/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

//First Party Imports
import { pageTitles } from '../../constants';
import { useFetch } from '../../Hooks/Fetch';
import { Button } from '../../Components/Button/Button';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { ConfirmEmailChangeRequest, ConfirmEmailChangeResponse } from '../../Swagger';


export function ConfirmEmailChange(props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const history = useHistory();
  const { token } = useParams<{token: string | undefined}>()

  const [fetching, setFetching] = useState(true);
  const [confirmChangeEmailResponse, setConfirmChangeEmailResponse] = useState<ConfirmEmailChangeResponse>();
  const fetchConfirmEmailChangeEmail = useFetch(elevatedState.APIInstances.User,
                                                elevatedState.APIInstances.User.confirmEmailChange,
                                                elevatedState, setElevatedState, setConfirmChangeEmailResponse,
                                                setFetching)


  useEffect(() => {
    document.title = pageTitles["confirmEmailChange"]
  }, [])

  useEffect(() => {
    if(!fetching) return;

    const requestParams: ConfirmEmailChangeRequest  = {
      token: token!
    }

    fetchConfirmEmailChangeEmail(requestParams)
  }, [fetching]);

  useEffect(() => {
    if(!confirmChangeEmailResponse) return;

    setElevatedState(prev => ({...prev, msg: confirmChangeEmailResponse.msg!}))
  }, [confirmChangeEmailResponse])


  return (
    <Container>
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            {confirmChangeEmailResponse ?
            <h2>{confirmChangeEmailResponse.confirmed ?
            `Your email has been changed` :
            `Sending confirmation email...`}</h2> :
            <h2>Sorry the link was either changed or it took to much time to confirm your new email.</h2>}
          </Row>

          {confirmChangeEmailResponse?.confirmed &&
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