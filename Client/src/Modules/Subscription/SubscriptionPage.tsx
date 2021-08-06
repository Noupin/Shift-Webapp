/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { pageTitles } from '../../constants';
import { useFetch } from '../../Hooks/Fetch';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { StripeCreateCheckoutSessionResponse } from '../../Swagger';


export function SubscriptionPage(props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  const stripe = useStripe();

  const [stripeCreateCheckoutResponse, setStripeCreateCheckoutResponse] = useState<StripeCreateCheckoutSessionResponse>();
  const fetchCreateCheckout = useFetch(elevatedState.APIInstances.Subscription,
                                       elevatedState.APIInstances.Subscription.createCheckoutSession,
                                       elevatedState, setElevatedState, setStripeCreateCheckoutResponse)


  useEffect(() => {
    document.title = pageTitles["subscription"]
    fetchCreateCheckout()
  }, [])

  useEffect(() => {
    if(!stripeCreateCheckoutResponse) return;

    stripe!.redirectToCheckout({sessionId: stripeCreateCheckoutResponse.sessionId!})
  }, [stripeCreateCheckoutResponse])


  return (
    <Container>
      <Row className="mt-auto mb-auto">
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row className="justify-content-center">
            <h2>{stripeCreateCheckoutResponse ? "Redirecting to checkout..." : "Setting up checkout..."}</h2>
          </Row>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
}