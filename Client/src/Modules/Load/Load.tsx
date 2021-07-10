/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { defaultShiftTitle, pageTitles, videoTypes } from "../../constants";
import { fillArray } from "../../Helpers/Arrays";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { LoadDataResponse, LoadDataRequest, GetIndivdualShiftRequest } from '../../Swagger';
import { LoadAPIInstance, ShiftAPIInstance } from '../../Helpers/Api';
import { Loader } from '../../Components/Loader/Loader';
import { LoadMediaComponent } from '../../Components/Load/LoadMediaComponent';
import { LoadTitleComponent } from '../../Components/Load/LoadTitleComponent';


export function Load (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [title, setTitle] = useState(defaultShiftTitle);
  const [trainingDataTypes, setTrainingDataTypes] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [baseFiles, setBaseFiles] = useState<File[]>([]);
  const [maskFiles, setMaskFiles] = useState<File[]>([]);
  const [baseMedia, setBaseMedia] = useState<File>();

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [loadResponse, setLoadResponse] = useState<LoadDataResponse>();

  const prevShiftUUID = sessionStorage["shiftUUID"];

  
  useEffect(() => {
    document.title = pageTitles["load"]
    setElevatedState((prev) => ({...prev, prebuiltShiftModel: "", shiftTitle: defaultShiftTitle}))

    async function setMediaFromPrebuilt(){
      const requestParams: GetIndivdualShiftRequest = {
        uuid: elevatedState().prebuiltShiftModel
      }
      const shiftResponse = await ShiftAPIInstance.getIndivdualShift(requestParams)
      const apiPrefix = videoTypes.indexOf(shiftResponse.shift!.baseMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'
      const baseMediaResponse = await fetch(`${apiPrefix}${shiftResponse.shift!.baseMediaFilename!}`)
      const baseMediaBlob = await baseMediaResponse.blob()
      setBaseMedia(new File([baseMediaBlob], shiftResponse.shift!.baseMediaFilename!))
    }

    if(elevatedState().prebuiltShiftModel){
      setMediaFromPrebuilt()
    }
  }, []);

  //Load Request
  useEffect(() => {
    if(!fetching) return;

    if(!baseMedia){
      setElevatedState((prev) => ({...prev, msg: "Make sure you have a primary base media"}))
      setFetching(false);
      return;
    }

    if(title.length < 1){
      setElevatedState((prev) => ({...prev, msg: "That title is not valid."}))
      setFetching(false);
      return;
    }

    let renamedFiles: Blob[] = files.map((file: File) => {
      return new File([file], `${uuidv4()}.${file.name.split('.').pop()!.toLowerCase()}`, {type: file.type})
    })

    const loadDataParams: LoadDataRequest = {
      trainingDataTypes: trainingDataTypes,
      requestFiles: renamedFiles
    }

    setElevatedState((prev) => ({...prev, shiftTitle: title}))
  
    LoadAPIInstance.loadData(loadDataParams).then((value) => {
      setLoadResponse(value)
    })
    setFetching(false)
  }, [fetching]);

  //Update values from response
  useEffect(() => {
    if(!loadResponse) return;

    setElevatedState((prev) => ({...prev, shiftUUID: loadResponse.shiftUUID!}))
    setElevatedState((prev) => ({...prev, msg: loadResponse.msg!}));
  }, [loadResponse]);

  //Change the page from button clicks
  useEffect(() => {
    if(!elevatedState().shiftUUID || elevatedState().shiftUUID === prevShiftUUID) return;

    if(elevatedState().trainingShift){
      history.push(`/${elevatedState().defaultTrainView === "basic" ? "train" : "advancedTrain"}`);
    }
    else{
      setElevatedState((prev) => ({...prev, prebuiltShiftModel: "PTM"}))
      history.push(`/inference`)
    }
  }, [elevatedState().shiftUUID]);

  //Update files to send
  useEffect(() => {
    if(!baseMedia) return;

    setFiles([baseMedia, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1),
                          ...fillArray("mask", maskFiles.length)])
  }, [baseMedia, baseFiles, maskFiles]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <LoadTitleComponent elevatedState={elevatedState} setElevatedState={setElevatedState}
        baseMedia={baseMedia} title={title} setTitle={setTitle}/>
      <LoadMediaComponent elevatedState={elevatedState} setElevatedState={setElevatedState}
        baseMedia={baseMedia} setBaseMedia={setBaseMedia} baseFiles={baseFiles}
        setBaseFiles={setBaseFiles} maskFiles={maskFiles} setMaskFiles={setMaskFiles}/>
      {fetching ? <Row className="justify-content-center"><Loader/></Row> : <></>}
      <Row className="mt-3 justify-content-center">
        <Col xs={2}></Col>
          <Col xs={8}>
            <Button className="p-2 mt-2 mb-2 borderRadius-2 w-100" disabled={fetching} onClick={() => setFetching(true)}>Load</Button>
          </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}