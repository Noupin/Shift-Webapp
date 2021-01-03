//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { IElevatedPageState } from "../../Interfaces/PageState";

interface trainRequestReturn {
  msg: string
}

export const Train = (props: IElevatedPageState) => {

  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({shiftUUID: props.shiftUUID,
                          usePTM: false,
                          prebuiltShiftModel: ""})
  };

  const trainShift = () => {
    fetch(`/api/train`, requestOptions).then(res => res.json()).then((data: trainRequestReturn) => {
      console.log(data);
      props.setMsg(data.msg);
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={trainShift}>Train</Button>
        </Col>
        <Col>
          <Link to="/shift" className="w-100">
            <Button>Get Final Shift?</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}