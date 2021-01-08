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


let trainResponse: ITrainRequestReturn = {msg: "", exhibit: []}


export const AdvancedTrain = (props: IElevatedPageState) => {
  const [stopTrain, setStopTrain] = useState(false);

  const [imageString, setImageString] = useState("");
  const [baseImage, setBaseImage] = useState(defaultVideo);
  const [baseRemake, setBaseRemake] = useState(defaultVideo);
  const [maskImage, setMaskmage] = useState(defaultVideo);
  const [maskRemake, setMaskRemake] = useState(defaultVideo);

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [trainResponse, setTrainResponse] = useState<ITrainRequestReturn>();
  const [converting, setConverting] = useState(false);

  let requestOptions: RequestInit = {};


  useFetch(() => fetching, setFetching, props.setError, setTrainResponse, `/api/users/advancedTrain`, () => requestOptions)
  useConvertImage(() => converting, setConverting, props.setError, setBaseImage, () => imageString);

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
                            trainType: 'advanced'})
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
      setFetching(false);
      history.push("/shift");
      return;
    }

    setFetching(true);
  }, [baseImage, baseRemake, maskImage, maskRemake]); //may need stopTrain in dependencies


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
            <Button className="borderRadius-2 p-2 mr-2 w-100" disabled={converting && fetching} onClick={() => setStopTrain(true)}>Basic View</Button>
          </Link>
        </Col>
        <Col xs={4} className="m-2">
          <Button className="borderRadius-2 p-2 ml-2 w-100" disabled={stopTrain && fetching} onClick={() => setStopTrain(true)}>Stop Training</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}