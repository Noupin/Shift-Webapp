/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { Button, Media, Loader } from "@noupin/feryv-components";
import { useConvertImage } from "../../Hooks/Images";
import { CombinedTrainResponse } from '../../Interfaces/CombinedTrain';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { StopTrainRequest, TrainOperationRequest, TrainRequest, TrainStatusRequest } from '../../Swagger';
import { pageTitles, TRAIN_STATUS_INTERVAL } from '../../constants';
import { useInterval } from '../../Hooks/Interval';
import { useFetch } from '../../Hooks/Fetch';


export function Train (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  useEffect(() => {
    setElevatedState((prev) => ({...prev, shiftUUID: sessionStorage["shiftUUID"]}))
  }, []);

  const [stopTrain, setStopTrain] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [image, setImage] = useState<File>();

  const history = useHistory()

  const [updating, setUpdating] = useState(false);
  const [stop, setStop] = useState(false);
  const [trainResponse, setTrainResponse] = useState<CombinedTrainResponse>();
  const [, setConverting] = useState(false);

  const fetchTrain = useFetch()({
    thisArg: elevatedState.APIInstances.Train,
    swaggerFunction: elevatedState.APIInstances.Train.train,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setTrainResponse,
    setLoading: setUpdating
  })
  const fetchTrainStatus = useFetch()({
    thisArg: elevatedState.APIInstances.Train,
    swaggerFunction: elevatedState.APIInstances.Train.trainStatus,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setTrainResponse,
    setLoading: setUpdating
  })
  const fetchStopTrain = useFetch()({
    thisArg: elevatedState.APIInstances.Train,
    swaggerFunction: elevatedState.APIInstances.Train.stopTrain,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setTrainResponse
  })

  const convertImage = useConvertImage(setConverting, setElevatedState,
    setImage, () => trainResponse!.exhibit!.length > 0 ? trainResponse!.exhibit![0] : "");


  async function stopTraining(){
    const stopTrainRequestParams: TrainRequest = {
      shiftUUID: elevatedState.shiftUUID,
      shiftTitle: elevatedState.shiftTitle,
      usePTM: elevatedState.frontEndSettings.usePTM,
      prebuiltShiftModel: elevatedState.prebuiltShiftModel,
      trainType: 'basic'
    };
    const stopTrainBody: StopTrainRequest = {
      body: stopTrainRequestParams
    }

    await fetchStopTrain(stopTrainBody)
  }


  //Start training the AI on the backend and stop on page leave.
  useEffect(() => {
    document.title = pageTitles["train"]

    async function startTrain(){
      const trainRequestParams: TrainRequest = {
        shiftUUID: elevatedState.shiftUUID,
        shiftTitle: elevatedState.shiftTitle,
        usePTM: elevatedState.frontEndSettings.usePTM,
        prebuiltShiftModel: elevatedState.prebuiltShiftModel,
        trainType: 'basic'
      };
      const trainBody: TrainOperationRequest = {
        body: trainRequestParams
      }

      fetchTrain(trainBody)
    }

    startTrain()

    return () => {
      if(!stopTrain){
        stopTraining()
      }
    }
  }, []);

  //Get the updated shift image
  useEffect(() => {
    if(!updating) return;

    const trainStatusRequestParams: TrainRequest = {
      shiftUUID: elevatedState.shiftUUID,
      shiftTitle: elevatedState.shiftTitle,
      usePTM: elevatedState.frontEndSettings.usePTM,
      prebuiltShiftModel: elevatedState.prebuiltShiftModel,
      trainType: 'basic'
    };
    const trainStatusBody: TrainStatusRequest = {
      body: trainStatusRequestParams
    }

    fetchTrainStatus(trainStatusBody)
  }, [updating]);

  //Stop training the AI on the backend
  useEffect(() => {
    if(!stop) return;

    stopTraining()
    setStopping(true);
  }, [stop]);

  //Update training status every second
  useInterval(() => {
    if (updating) return

    if(stopping && !stopTrain){
      setUpdating(true)
    }
  }, TRAIN_STATUS_INTERVAL)

  //Update the image displayed to the user and stop the training interval
  useEffect(() => {
    if(!trainResponse) return;

    setElevatedState((prev) => ({...prev, msg: trainResponse!.msg!}));

    if(trainResponse.stopped!){
      setStopTrain(true);
    }

    if(!trainResponse!.exhibit!) return;

    convertImage()
  }, [trainResponse]);

  //Move the user to other pages on button clicks
  useEffect(() => {
    if(stopTrain){
      history.push("/inference")
    }

    return;
  }, [stopTrain])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column" 
               key={image ? image.lastModified : undefined}>
      <Row className="my-2">
        <Media className="neumorphic borderRadius-2 my-2 w-100 p-2"
          mediaSrc={image!} mediaType="video/mp4"
          errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
      </Row>
      {(updating || stop) ? <Row className="justify-content-center"><Loader/></Row> : <></>}
      <Row className="my-2">
        <Col xs={1}></Col>
        <Col xs={4} className="pr-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={stop}
            onClick={() => console.log("Switch Front End State")}>Advanced View</Button>
        </Col>
        <Col xs={4} className="pl-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={stop}
            onClick={() => setStop(true)}>Stop Training</Button>
        </Col>
        <Col xs={2} className="pl-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={stop || updating}
            onClick={() => setUpdating(true)}>Update</Button>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
}