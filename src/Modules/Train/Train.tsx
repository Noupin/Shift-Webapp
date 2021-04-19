/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { ITrainRequestReturn } from "../../Interfaces/Train";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { useFetch } from "../../Hooks/Fetch";
import { useConvertImage } from "../../Hooks/Images";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


export function Train (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  useEffect(() => {
    setElevatedState((prev) => ({...prev, shiftUUID: sessionStorage["shiftUUID"]}))
    setElevatedState((prev) => ({...prev, prebuiltShiftModel: elevatedState().shiftUUID}))
  }, []);

  const [stopTrain, setStopTrain] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [advancedView, setAdvancedView] = useState(false);
  const [imageString, setImageString] = useState("");
  const [image, setImage] = useState<File>();

  const history = useHistory()

  const [training, setTraining] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [stop, setStop] = useState(false);
  const [trainResponse, setTrainResponse] = useState<ITrainRequestReturn>();
  const [, setConverting] = useState(false);

  let requestOptions: RequestInit = {};

  function updateRequestOptions(){
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
  }


  const startTraining = useFetch(setTraining, setElevatedState, setTrainResponse, `/api/train`, () => requestOptions, trainResponse)
  const updateStatus = useFetch(setUpdating, setElevatedState, setTrainResponse, `/api/trainStatus`, () => requestOptions, trainResponse)
  const stopTraining = useFetch(setStop, setElevatedState, setTrainResponse, `/api/stopTraining`, () => requestOptions, trainResponse)
  const convertImage = useConvertImage(setConverting, setElevatedState, setImage, () => imageString);


  //Start training the AI on the backend
  useEffect(() => {
    if(!training) return;

    updateRequestOptions()

    startTraining()
  }, [training]);

  //Get the updated shift image
  useEffect(() => {
    if(!updating) return;

    updateRequestOptions()

    updateStatus()
  }, [updating]);

  //Stop training the AI on the backend
  useEffect(() => {
    if(!stop) return;

    updateRequestOptions()

    stopTraining();
    setStopping(true);
  }, [stop]);

  //Update training status every second
  useEffect(() => {
    const interval = setInterval(() => {
      if(stopping && !stopTrain){
        updateRequestOptions();
        updateStatus();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stopping]);


  //Update the image displayed to the user and stop the training interval
  useEffect(() => {
    if(!trainResponse) return;

    setElevatedState((prev) => ({...prev, msg: trainResponse!.msg}));

    if(trainResponse!.stopped){
      setStopTrain(true);
    }

    if(!trainResponse!.exhibit) return;

    setImageString(trainResponse!.exhibit[0]);
  }, [trainResponse]);

  //Convert imageString to a useable image
  useEffect(() => {
    if(!imageString) return;

		convertImage()
	}, [imageString]);

  //Move the user to other pages on button clicks
  useEffect(() => {
    if(stopTrain){
      history.push("/shift")
    }

    if(advancedView){
      history.push("/advancedTrain")
    }

  }, [stopTrain, advancedView])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column" key={image ? image.lastModified : undefined}>
      <Row className="my-2">
        <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-2 w-100 p-2" mediaSrc={image!} mediaType="video/mp4"/>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={4}>
          <Button className="p-2 mt-2 mb-2 mr-4 borderRadius-2 w-100" disabled={advancedView} onClick={() => setAdvancedView(true)}>Advanced View</Button>
        </Col>
        <Col xs={4}>
          <Button className="p-2 mt-2 mb-2 ml-4 borderRadius-2 w-100" disabled={stopTrain} onClick={() => setStop(true)}>Stop Training</Button>
        </Col>
        <Col xs={2}><Button className="p-2 mt-2 mb-2 ml-4 borderRadius-2 w-100" disabled={stopTrain} onClick={() => setUpdating(true)}>Update</Button></Col>
      </Row>
    </Container>
  );
}