/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { ITrainRequestReturn } from "../../Interfaces/Train";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { useFetch } from "../../Hooks/Fetch";
import { useConvertImage } from "../../Hooks/Images";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


let trainResponse: ITrainRequestReturn = {msg: "", exhibit: [], stopped: false}


export function AdvancedTrain (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  useEffect(() => {
    setElevatedState((prev) => ({...prev, shiftUUID: sessionStorage["shiftUUID"]}))
    setElevatedState((prev) => ({...prev, prebuiltShiftModel: elevatedState().shiftUUID}))
  }, []);

  const [basicView, setBasicView] = useState(false);
  const [stopTrain, setStopTrain] = useState(false);

  const [imageString, setImageString] = useState("");
  const [baseImage, setBaseImage] = useState<File>();
  const [baseRemake, setBaseRemake] = useState<File>();
  const [maskImage, setMaskmage] = useState<File>();
  const [maskRemake, setMaskRemake] = useState<File>();

  const history = useHistory()

  const [fetching, setFetching] = useState(true);
  const [trainResponse, setTrainResponse] = useState<ITrainRequestReturn>();
  const [converting, setConverting] = useState(false);

  let requestOptions: RequestInit = {};


  const fetchTrain = useFetch(setFetching, setElevatedState, setTrainResponse, `/api/train`, () => requestOptions, trainResponse)
  const convertImage = useConvertImage(setConverting, setElevatedState, setBaseImage, () => imageString);


  useEffect(() => {
    if(!fetching || stopTrain || basicView) return;

    requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({shiftUUID: elevatedState().shiftUUID,
                            usePTM: elevatedState().usePTM,
                            prebuiltShiftModel: elevatedState().prebuiltShiftModel,
                            epochs: elevatedState().trainStatusInterval,
                            trainType: 'basic'})
    };

    fetchTrain()
  }, [fetching]);

  useEffect(() => {
    if(!converting || !trainResponse) return;

    setElevatedState((prev) => ({...prev, msg: trainResponse!.msg}))
    setImageString(trainResponse.exhibit[0]);
  }, [trainResponse]);

  useEffect(() => {
		if(!imageString) return;
		convertImage()
	}, [imageString]);

  useEffect(() => {
    if(stopTrain){
      history.push("/shift")
    }
    if(basicView){
      history.push("/train")
    }

    if(!baseImage) return;

    setFetching(true)
  }, [baseImage, baseRemake, maskImage, maskRemake])



  return (
    <Container className="d-flex justify-content-center h-100 flex-column" key={baseImage ? baseImage.size : undefined}>
      <Row>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={baseImage!} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={baseImage!} mediaType="video/mp4"/>
          </Row>
        </Col>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={baseImage!} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={baseImage!} mediaType="video/mp4"/>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4} className="m-2">
          <Link to="/train" className="w-100">
            <Button className="borderRadius-2 p-2 mr-2 w-100" disabled={ basicView} onClick={() => setBasicView(true)}>Basic View</Button>
          </Link>
        </Col>
        <Col xs={4} className="m-2">
          <Button className="borderRadius-2 p-2 ml-2 w-100" disabled={stopTrain} onClick={() => setStopTrain(true)}>Stop Training</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}