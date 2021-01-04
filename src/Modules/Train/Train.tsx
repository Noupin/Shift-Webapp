//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';


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
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row>
        <Media className="neumorphic mt-2 mb-2 borderRadius-2" mediaSrc="chris.mp4" mediaType="video/mp4"/>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4}>
          <Link to="/advancedTrain" className="w-100">
            <Button className="p-2 mt-2 mb-2 mr-4 borderRadius-2">Advanced View</Button>
          </Link>
        </Col>
        <Col xs={4}>
          <Button className="p-2 mt-2 mb-2 ml-4 borderRadius-2" onClick={trainShift}>Shift</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}