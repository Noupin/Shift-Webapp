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


export const Train = (props: IElevatedPageState) => {
  const [stopTrain, setStopTrain] = useState(false);
  const [imageString, setImageString] = useState("");
  const [image, setImage] = useState(defaultVideo);

  const history = useHistory()

  const [fetching, setFetching] = useState(true);
  const [trainResponse, setTrainResponse] = useState<ITrainRequestReturn>();
  const [converting, setConverting] = useState(false);

  let requestOptions: RequestInit = {};


  const apiFetch = useFetch(setFetching, props.setError, setTrainResponse, `/api/train`, () => requestOptions, trainResponse)
  const convertImage = useConvertImage(setConverting, props.setError, setImage, () => imageString);

  useEffect(() => {
    if(!fetching || stopTrain) return;

    requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({shiftUUID: props.shiftUUID(),
                            usePTM: false,
                            prebuiltShiftModel: "",
                            epochs: props.epochs,
                            trainType: 'basic'})
    };

    apiFetch()
  }, [fetching]);

  useEffect(() => {
    if(!trainResponse) return;

    props.setMsg(trainResponse!.msg)
    setImageString(trainResponse!.exhibit[0]);
  }, [trainResponse]);

  useEffect(() => {
		if(!imageString) return;
		convertImage()
	}, [imageString]);

  useEffect(() => {
    if(stopTrain){
      history.push("/shift")
    }

    if(image === defaultVideo) return;

    console.log("Image Converted")
    setFetching(true)
  }, [image])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column" key={image.lastModified}>
      <Row className="my-2">
        <Media elevatedProps={props} className="neumorphic borderRadius-2 my-2 w-100 p-2" mediaSrc={image} mediaType="video/mp4"/>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4}>
          <Link to="/advancedTrain" className="w-100">
            <Button className="p-2 mt-2 mb-2 mr-4 borderRadius-2 w-100" disabled={stopTrain} onClick={() => setStopTrain(true)}>Advanced View</Button>
          </Link>
        </Col>
        <Col xs={4}>
          <Button className="p-2 mt-2 mb-2 ml-4 borderRadius-2 w-100" disabled={stopTrain} onClick={() => setStopTrain(true)}>Stop Training</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}