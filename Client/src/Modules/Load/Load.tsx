/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

//First Party Imports
import { Button, Loader } from "@noupin/feryv-components";
import { getCDNPrefix } from '@noupin/feryv-cdn-helpers';
import { defaultShiftTitle, pageTitles } from "../../constants";
import { fillArray } from "../../Helpers/Arrays";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { LoadDataResponse, LoadDataRequest, GetIndivdualShiftRequest, IndividualShiftGetResponse } from '../../Swagger';
import { LoadMediaComponent } from '../../Components/Load/LoadMediaComponent';
import { LoadTitleComponent } from '../../Components/Load/LoadTitleComponent';
import { useFetch } from '../../Hooks/Fetch';
import { urlToFile } from '../../Helpers/Files';


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
  const [shiftResponse, setShiftResponse] = useState<IndividualShiftGetResponse>();

  const fetchLoad = useFetch()({
    thisArg: elevatedState.APIInstances.Load,
    swaggerFunction: elevatedState.APIInstances.Load.loadData,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setLoadResponse
  })
  const fetchShift = useFetch()({
    thisArg: elevatedState.APIInstances.Shift,
    swaggerFunction: elevatedState.APIInstances.Shift.getIndivdualShift,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setShiftResponse
  })


  const prevShiftUUID = sessionStorage["shiftUUID"];


  useEffect(() => {
    document.title = pageTitles["load"]
    setElevatedState((prev) => ({...prev, shiftTitle: defaultShiftTitle}))
  }, []);

  useEffect(() => {
    async function setMediaFromPrebuilt(){
      const requestParams: GetIndivdualShiftRequest = {
        uuid: elevatedState.prebuiltShiftModel
      }
      fetchShift(requestParams)

      if(!shiftResponse || !shiftResponse.shift || !shiftResponse.shift!.baseMediaFilename) return;

      setBaseMedia(await urlToFile(`${getCDNPrefix(shiftResponse.shift!.baseMediaFilename!)}${shiftResponse.shift!.baseMediaFilename!}`, shiftResponse.shift!.baseMediaFilename!))
      setElevatedState((prev) => ({...prev, prebuiltShiftModel: ""}))
    }

    if(elevatedState.prebuiltShiftModel){
      setMediaFromPrebuilt()
    }
  }, [shiftResponse]);

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
  
    fetchLoad(loadDataParams)
    setElevatedState((prev) => ({...prev, shiftTitle: title}))
  }, [fetching]);

  //Update values from response
  useEffect(() => {
    if(!loadResponse) return;

    setElevatedState((prev) => ({...prev, shiftUUID: loadResponse.shiftUUID!}))
    setElevatedState((prev) => ({...prev, msg: loadResponse.msg!}));
  }, [loadResponse]);

  //Change the page from button clicks
  useEffect(() => {
    if(!elevatedState.shiftUUID || elevatedState.shiftUUID === prevShiftUUID) return;

    if(elevatedState.frontEndSettings.trainingShift){
      history.push(`/train`);
    }
    else{
      history.push(`/inference`)
    }
  }, [elevatedState.shiftUUID]);

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