/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { Media } from '../../Components/Media/Media';
import { useConvertImage } from "../../Hooks/Images";
import { TrainAPIInstance } from '../../Helpers/Api';
import { Button } from '../../Components/Button/Button';
import { CombinedTrainResponse } from '../../Interfaces/CombinedTrain';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { StopTrainRequest, TrainOperationRequest, TrainRequest, TrainStatusRequest } from '../../Swagger';
import { Loader } from '../../Components/Loader/Loader';


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

  const [updating, setUpdating] = useState(true);
  const [stop, setStop] = useState(false);
  const [trainResponse, setTrainResponse] = useState<CombinedTrainResponse>();
  const [, setConverting] = useState(false);

  const convertImage = useConvertImage(setConverting, setElevatedState, setImage, () => imageString);


  //Start training the AI on the backend
  useEffect(() => {
    const trainRequestParams: TrainRequest = {
      shiftUUID: elevatedState().shiftUUID,
      shiftTitle: elevatedState().shiftTitle,
      usePTM: elevatedState().usePTM,
      prebuiltShiftModel: elevatedState().prebuiltShiftModel,
      statusInterval: elevatedState().trainStatusInterval,
      trainType: 'basic'
    };
    const trainBody: TrainOperationRequest = {
      body: trainRequestParams
    }

    TrainAPIInstance.train(trainBody).then((value) => {
      setTrainResponse(value)
    })
  }, []);

  //Get the updated shift image
  useEffect(() => {
    if(!updating) return;

    const trainStatusRequestParams: TrainRequest = {
      shiftUUID: elevatedState().shiftUUID,
      shiftTitle: elevatedState().shiftTitle,
      usePTM: elevatedState().usePTM,
      prebuiltShiftModel: elevatedState().prebuiltShiftModel,
      statusInterval: elevatedState().trainStatusInterval,
      trainType: 'basic'
    };
    const trainStatusBody: TrainStatusRequest = {
      body: trainStatusRequestParams
    }

    TrainAPIInstance.trainStatus(trainStatusBody).then((value) => {
      setTrainResponse(value)
    })
    setUpdating(false)
  }, [updating]);

  //Stop training the AI on the backend
  useEffect(() => {
    if(!stop) return;

    const stopTrainRequestParams: TrainRequest = {
      shiftUUID: elevatedState().shiftUUID,
      shiftTitle: elevatedState().shiftTitle,
      usePTM: elevatedState().usePTM,
      prebuiltShiftModel: elevatedState().prebuiltShiftModel,
      statusInterval: elevatedState().trainStatusInterval,
      trainType: 'basic'
    };
    const stopTrainBody: StopTrainRequest = {
      body: stopTrainRequestParams
    }

    TrainAPIInstance.stopTrain(stopTrainBody).then((value) => {
      setTrainResponse(value)
    })

    setStopping(true);
  }, [stop]);

  //Update training status every second
  useEffect(() => {
    if(updating) return;

    const interval = setInterval(() => {
      if(stopping && !stopTrain){
        const trainStatusRequestParams: TrainRequest = {
          shiftUUID: elevatedState().shiftUUID,
          shiftTitle: elevatedState().shiftTitle,
          usePTM: elevatedState().usePTM,
          prebuiltShiftModel: elevatedState().prebuiltShiftModel,
          statusInterval: elevatedState().trainStatusInterval,
          trainType: 'basic'
        };
        const trainStatusBody: TrainStatusRequest = {
          body: trainStatusRequestParams
        }
    
        TrainAPIInstance.trainStatus(trainStatusBody).then((value) => {
          setTrainResponse(value)
        })
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

    setImageString(trainResponse!.exhibit![0]);
  }, [trainResponse]);

  //Convert imageString to a useable image
  useEffect(() => {
    if(!imageString) return;

		convertImage()
	}, [imageString]);

  //Move the user to other pages on button clicks
  useEffect(() => {
    if(stopTrain){
      history.push("/inference")
    }

    if(advancedView){
      history.push("/advancedTrain")
    }

    return;
  }, [stopTrain, advancedView])


  return (
    <Container className="d-flex justify-content-center h-100 flex-column" key={image ? image.lastModified : undefined}>
      <Row className="my-2">
        <Media setElevatedState={setElevatedState} className="neumorphic borderRadius-2 my-2 w-100 p-2" mediaSrc={image!} mediaType="video/mp4"/>
      </Row>
      {updating || stop ? <Row><Loader/></Row> : <></>}
      <Row className="my-2">
        <Col xs={1}></Col>
        <Col xs={4} className="pr-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={advancedView} onClick={() => setAdvancedView(true)}>Advanced View</Button>
        </Col>
        <Col xs={4} className="pl-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={stopTrain} onClick={() => setStop(true)}>Stop Training</Button>
        </Col>
        <Col xs={2} className="pl-4">
          <Button className="p-2 borderRadius-2 w-100" disabled={stopTrain} onClick={() => setUpdating(true)}>Update</Button>
        </Col>
        <Col xs={1}>
        </Col>
      </Row>
    </Container>
  );
}