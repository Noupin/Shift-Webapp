/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { Button, Media, Loader } from "@noupin/feryv-components";
import { CombinedTrainResponse } from "../../Interfaces/CombinedTrain";
import { useConvertImage } from "../../Hooks/Images";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { pageTitles, TRAIN_STATUS_INTERVAL } from '../../constants';
import { StopTrainRequest, TrainOperationRequest, TrainRequest, TrainStatusRequest } from '../../Swagger';
import { TrainAPIFactory } from '../../Helpers/Api';
import { useInterval } from '../../Hooks/Interval';


export function AdvancedTrain (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  let leavingPage = false

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


  async function trainStatus(){
    const trainStatusRequestParams: TrainRequest = {
      shiftUUID: elevatedState.shiftUUID,
      shiftTitle: elevatedState.shiftTitle,
      usePTM: elevatedState.frontEndSettings.usePTM,
      prebuiltShiftModel: elevatedState.prebuiltShiftModel,
      trainType: 'advanced'
    };
    const trainStatusBody: TrainStatusRequest = {
      body: trainStatusRequestParams
    }

    setUpdating(true)

    await TrainAPIFactory(elevatedState.accessToken).trainStatus(trainStatusBody).then((value) => {
      setTrainResponse(value)
    })

    setUpdating(false)
  }

  async function stopTraining(){
    const stopTrainRequestParams: TrainRequest = {
      shiftUUID: elevatedState.shiftUUID,
      shiftTitle: elevatedState.shiftTitle,
      usePTM: elevatedState.frontEndSettings.usePTM,
      prebuiltShiftModel: elevatedState.prebuiltShiftModel,
      trainType: 'advanced'
    };
    const stopTrainBody: StopTrainRequest = {
      body: stopTrainRequestParams
    }

    await TrainAPIFactory(elevatedState.accessToken).stopTrain(stopTrainBody).then((value) => {
      if(!leavingPage){
        setTrainResponse(value)
      }
    })
  }


  //Start training the AI on the backend
  useEffect(() => {
    document.title = pageTitles["advancedTrain"]

    const trainRequestParams: TrainRequest = {
      shiftUUID: elevatedState.shiftUUID,
      shiftTitle: elevatedState.shiftTitle,
      usePTM: elevatedState.frontEndSettings.usePTM,
      prebuiltShiftModel: elevatedState.prebuiltShiftModel,
      trainType: 'advanced'
    };
    const trainBody: TrainOperationRequest = {
      body: trainRequestParams
    }
    
    TrainAPIFactory(elevatedState.accessToken).train(trainBody).then((value) => {
      setTrainResponse(value)
    })

    return () => {
      if(!stopTrain || !basicView){
        leavingPage = true
        stopTraining()
      }
    }
  }, []);

  //Get the updated shift image
  useEffect(() => {
    async function update(){
      if(!updating) return;

      await trainStatus()
    }

    update()
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

    convertBaseImage()
    convertBaseRemake()
    convertMaskImage()
    convertMaskRemake();
  }, [trainResponse]);



  return (
    <Container className="d-flex justify-content-center h-100 flex-column"
               key={baseImage ? baseImage.size : undefined}>
      <Row>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={baseImage!} mediaType="video/mp4"
              errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={maskImage!} mediaType="video/mp4"
              errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
          </Row>
        </Col>
        <Col className="my-2 px-2" xs={6}>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={baseRemake!} mediaType="video/mp4"
              errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
          </Row>
          <Row className="my-2 ml-4 py-2">
            <Media className="neumorphic borderRadius-2 my-1 w-100 p-2"
              mediaSrc={maskRemake!} mediaType="video/mp4"
              errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
          </Row>
        </Col>
      </Row>
      {(updating || stop) ? <Row className="justify-content-center"><Loader/></Row> : <></>}
      <Row className="my-2">
        <Col xs={1}></Col>
        <Col xs={4} className="pr-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={basicView || stop}
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