//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { ITrainRequestReturn } from "../../Interfaces/Train";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { defaultVideo } from "../../constants";
import { useFetch } from "../../Helpers/Fetch";
import { useConvertImage } from "../../Helpers/Images";


let trainResponse: ITrainRequestReturn = {msg: "", exhibit: []}


export function AdvancedTrain (props: {elevatedState: () => IElevatedPageState, setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>}){
  const {elevatedState, setElevatedState, ...navProps} = props;

  const [stopTrain, setStopTrain] = useState(false);

  const [imageString, setImageString] = useState("");
  const [baseImage, setBaseImage] = useState(defaultVideo);
  const [baseRemake, setBaseRemake] = useState(defaultVideo);
  const [maskImage, setMaskmage] = useState(defaultVideo);
  const [maskRemake, setMaskRemake] = useState(defaultVideo);

  const history = useHistory()

  const [fetching, setFetching] = useState(true);
  const [trainResponse, setTrainResponse] = useState<ITrainRequestReturn>();
  const [converting, setConverting] = useState(false);

  let requestOptions: RequestInit = {};


  const apiFetch = useFetch(setFetching, setElevatedState, setTrainResponse, `/api/train`, () => requestOptions, trainResponse)
  const convertImage = useConvertImage(setConverting, setElevatedState, setBaseImage, () => imageString);

  useEffect(() => {
    if(!fetching || stopTrain) return;

    requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({shiftUUID: elevatedState().shiftUUID,
                            usePTM: false,
                            prebuiltShiftModel: "",
                            epochs: elevatedState().epochs,
                            trainType: 'basic'})
    };

    apiFetch()
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
    if(baseImage === defaultVideo) return;

    if(stopTrain){
      history.push("/shift")
    }

    console.log("Image Converted")
    setFetching(true)
  }, [baseImage, baseRemake, maskImage, maskRemake])



  return (
    <Container className="d-flex justify-content-center h-100 flex-column" key={baseImage.lastModified}>
      <Row>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={baseImage} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
          </Row>
        </Col>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-1 w-100 p-2" mediaSrc={defaultVideo} mediaType="video/mp4"/>
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