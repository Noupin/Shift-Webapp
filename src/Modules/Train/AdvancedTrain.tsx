//Third Party Imports
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../Helpers/defaultMedia";
import { useFetch } from "../../Hooks/Fetch";


interface trainRequestReturn {
  msg: string
}

let trainResponse: trainRequestReturn = {msg: ""}


export const AdvancedTrain = (props: IElevatedPageState) => {
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(trainResponse);  

  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({shiftUUID: props.shiftUUID,
                          usePTM: false,
                          prebuiltShiftModel: ""})
  };

  
  async function train(){
    await apiFetch(`/api/train`, requestOptions)
    props.setMsg(apiResponse.msg)
  }


  useEffect(() => {
    console.error(apiError)
  }, [apiError]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
          </Row>
        </Col>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4} className="m-2">
          <Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 mr-2 w-100">Basic View</Button>
          </Link>
        </Col>
        <Col xs={4} className="m-2">
          <Button className="borderRadius-2 p-2 ml-2 w-100" onClick={train}>Shift</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}