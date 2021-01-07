//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { ITrainRequestReturn } from "../../Interfaces/Train";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../Helpers/defaultMedia";
import { useFetch } from "../../Hooks/Fetch";
import { useBinaryImageCovnersion } from "../../Hooks/Images";


let trainResponse: ITrainRequestReturn = {msg: "", exhibit: []}


export const Train = (props: IElevatedPageState) => {
  const [stopTrain, setStopTrain] = useState(false);
  const [image, setImage] = useState(defaultVideo);

  const history = useHistory()
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(trainResponse);  
  const [convertImage, imageFile, imageError, imageLoading] = useBinaryImageCovnersion()

  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({shiftUUID: props.shiftUUID,
                          usePTM: false,
                          prebuiltShiftModel: "",
                          epochs: 10,
                          trainType: 'basic'})
  };


  function train(){
    apiFetch(`/api/train`, requestOptions)
    props.setMsg(apiResponse.msg)
  }


  useEffect(() => {
    if (stopTrain){
      history.push("/shift")
      return;
    }

    train()
    convertImage(apiResponse.exhibit[-1])
    setImage(imageFile)
  }, [image]); //may need stopTrain in dependencies

  useEffect(() => {
    console.error(apiError)
  }, [apiError]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="my-2">
        <Media className="neumorphic borderRadius-2 my-2 w-100 p-2" mediaSrc={image} mediaType="video/mp4"/>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4}>
          <Link to="/advancedTrain" className="w-100">
            <Button className="p-2 mt-2 mb-2 mr-4 borderRadius-2 w-100" disabled={stopTrain && apiLoading} onClick={() => setStopTrain(true)}>Advanced View</Button>
          </Link>
        </Col>
        <Col xs={4}>
          <Button className="p-2 mt-2 mb-2 ml-4 borderRadius-2 w-100" disabled={stopTrain && apiLoading} onClick={() => setStopTrain(true)}>Stop Training</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}