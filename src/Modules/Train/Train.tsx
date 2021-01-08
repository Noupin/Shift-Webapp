//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { ITrainRequestReturn } from "../../Interfaces/Train";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../Constants/defaultMedia";
import { useFetch } from "../../Helpers/Fetch";
import { useConvertImage } from "../../Helpers/Images";


export const Train = (props: IElevatedPageState) => {
  const [stopTrain, setStopTrain] = useState(false);
  const [imageString, setImageString] = useState("");
  const [image, setImage] = useState(defaultVideo);

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [trainResponse, setTrainResponse] = useState<ITrainRequestReturn>();
  const [converting, setConverting] = useState(false);

  let requestOptions: RequestInit = {};


  useFetch(() => fetching, setFetching, props.setError, setTrainResponse, `/api/users/train`, () => requestOptions)
  useConvertImage(() => converting, setConverting, props.setError, setImage, () => imageString);

  useEffect(() => {
    if(!fetching) return;
    requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({shiftUUID: props.shiftUUID,
                            usePTM: false,
                            prebuiltShiftModel: "",
                            epochs: props.epochs,
                            trainType: 'basic'})
    };

    props.setMsg(trainResponse!.msg);
    setImageString(trainResponse!.exhibit[0]);
    setConverting(true);
  }, [fetching]);

  useEffect(() => {
    if(!converting) return;
    console.log("Converted Image");
  }, [converting]);

  useEffect(() => {
    if (stopTrain){
      history.push("/shift");
      return;
    }

    setFetching(true);
  }, [image]); //may need stopTrain in dependencies


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <Row className="my-2">
        <Media className="neumorphic borderRadius-2 my-2 w-100 p-2" mediaSrc={image} mediaType="video/mp4"/>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4}>
          <Link to="/advancedTrain" className="w-100">
            <Button className="p-2 mt-2 mb-2 mr-4 borderRadius-2 w-100" disabled={converting && fetching} onClick={() => setStopTrain(true)}>Advanced View</Button>
          </Link>
        </Col>
        <Col xs={4}>
          <Button className="p-2 mt-2 mb-2 ml-4 borderRadius-2 w-100" disabled={stopTrain && fetching} onClick={() => setStopTrain(true)}>Stop Training</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}