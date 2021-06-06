/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

//First Party Imports
import { CombinedTrainResponse } from "../../Interfaces/CombinedTrain";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { useConvertImage } from "../../Hooks/Images";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { pageTitles } from '../../constants';
import { StopTrainRequest, TrainOperationRequest, TrainRequest, TrainStatusRequest } from '../../Swagger';
import { TrainAPIInstance } from '../../Helpers/Api';
import { Loader } from '../../Components/Loader/Loader';


export function AdvancedTrain (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  useEffect(() => {
    setElevatedState((prev) => ({...prev, shiftUUID: sessionStorage["shiftUUID"]}))
  }, []);

  const [stopTrain, setStopTrain] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [basicView, setBasicView] = useState(false);

  const [baseImage, setBaseImage] = useState<File>();
  const [baseRemake, setBaseRemake] = useState<File>();
  const [maskImage, setMaskImage] = useState<File>();
  const [maskRemake, setMaskRemake] = useState<File>();

  const history = useHistory()

  const [updating, setUpdating] = useState(true);
  const [stop, setStop] = useState(false);
  const [trainResponse, setTrainResponse] = useState<CombinedTrainResponse>();
  const [, setConverting] = useState(false);

  const convertBaseImage = useConvertImage(setConverting, setElevatedState,
    setBaseImage, () => trainResponse!.exhibit!.length > 0 ? trainResponse!.exhibit![0] : "");
  const convertBaseRemake = useConvertImage(setConverting, setElevatedState,
    setBaseRemake, () => trainResponse!.exhibit!.length > 1 ? trainResponse!.exhibit![1] : "");
  const convertMaskImage = useConvertImage(setConverting, setElevatedState,
    setMaskImage, () => trainResponse!.exhibit!.length > 2 ? trainResponse!.exhibit![2] : "");
  const convertMaskRemake = useConvertImage(setConverting, setElevatedState,
    setMaskRemake, () => trainResponse!.exhibit!.length > 3 ? trainResponse!.exhibit![3] : "");


  function trainStatus(){
    const trainStatusRequestParams: TrainRequest = {
      shiftUUID: elevatedState().shiftUUID,
      shiftTitle: elevatedState().shiftTitle,
      usePTM: elevatedState().usePTM,
      prebuiltShiftModel: elevatedState().prebuiltShiftModel,
      statusInterval: elevatedState().trainStatusInterval,
      trainType: 'advanced'
    };
    const trainStatusBody: TrainStatusRequest = {
      body: trainStatusRequestParams
    }

    TrainAPIInstance.trainStatus(trainStatusBody).then((value) => {
      setTrainResponse(value)
    })
  }

  function stopTraining(){
    const stopTrainRequestParams: TrainRequest = {
      shiftUUID: elevatedState().shiftUUID,
      shiftTitle: elevatedState().shiftTitle,
      usePTM: elevatedState().usePTM,
      prebuiltShiftModel: elevatedState().prebuiltShiftModel,
      statusInterval: elevatedState().trainStatusInterval,
      trainType: 'advanced'
    };
    const stopTrainBody: StopTrainRequest = {
      body: stopTrainRequestParams
    }

    TrainAPIInstance.stopTrain(stopTrainBody).then((value) => {
      setTrainResponse(value)
    })
  }


  useEffect(() => {
    document.title = pageTitles["advancedTrain"]
  }, [])


  //Start training the AI on the backend
  useEffect(() => {
    document.title = pageTitles["advancedTrain"]

    const trainRequestParams: TrainRequest = {
      shiftUUID: elevatedState().shiftUUID,
      shiftTitle: elevatedState().shiftTitle,
      usePTM: elevatedState().usePTM,
      prebuiltShiftModel: elevatedState().prebuiltShiftModel,
      statusInterval: elevatedState().trainStatusInterval,
      trainType: 'advanced'
    };
    const trainBody: TrainOperationRequest = {
      body: trainRequestParams
    }

    TrainAPIInstance.train(trainBody).then((value) => {
      setTrainResponse(value)
    })

    return () => {
      if(!stopTrain && !basicView){
        stopTraining()
      }
    }
  }, []);

  //Get the updated shift image
  useEffect(() => {
    if(!updating) return;

    trainStatus()
    setUpdating(false)
  }, [updating]);

  //Stop training the AI on the backend
  useEffect(() => {
    if(!stop) return;

    stopTraining()
    setStopping(true);
  }, [stop]);

  //Update training status every second
  useEffect(() => {
    if(updating) return;

    const interval = setInterval(() => {
      if(stopping && !stopTrain){
        trainStatus()
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stopping]);

  //Update the image displayed to the user and stop the training interval
  useEffect(() => {
    if(!trainResponse) return;

    setElevatedState((prev) => ({...prev, msg: trainResponse!.msg!}));

    if(trainResponse.stopped!){
      setStopTrain(true);
    }

    if(!trainResponse!.exhibit!) return;

    convertBaseImage()
    convertBaseRemake()
    convertMaskImage()
    convertMaskRemake();
  }, [trainResponse]);

  //Move the user to other pages on button clicks
  useEffect(() => {
    if(stopTrain){
      history.push("/inference")
    }

    if(basicView){
      history.push("/train")
    }

    return;
  }, [stopTrain, basicView])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column" key={baseImage ? baseImage.size : undefined}>
      <Row>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState}
              className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={baseImage!} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState}
              className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={maskImage!} mediaType="video/mp4"/>
          </Row>
        </Col>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState}
              className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={baseRemake!} mediaType="video/mp4"/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media setElevatedState={setElevatedState}
              className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={maskRemake!} mediaType="video/mp4"/>
          </Row>
        </Col>
      </Row>
      {(updating || stop) ? <Row className="justify-content-center"><Loader/></Row> : <></>}
      <Row>
        <Col xs={1}></Col>
        <Col xs={4} className="m-2">
          <Button className="borderRadius-2 p-2 mr-2 w-100" disabled={basicView || stop}
                  onClick={() => setBasicView(true)}>Basic View</Button>
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