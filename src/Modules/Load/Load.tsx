/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { MediaList } from "../../Components/MediaList/MediaList";
import { FileDialog } from "../../Components/FileDialog/FileDialog"
import { defaultVideo, validMediaFileExtesnions } from "../../constants";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { validateFileList } from '../../Helpers/Files';
import { fillArray } from "../../Helpers/Arrays";
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface loadRequestReturn {
  msg: string,
  shiftUUID: string
}

const ListOfFiles: File[] = [];
const ListOfDataType: string[] = [];


export function Load (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [trainingDataTypes, setTrainingDataTypes] = useState(ListOfDataType);
  const [files, setFiles] = useState(ListOfFiles);
  const [baseFiles, setBaseFiles] = useState(ListOfFiles);
  const [maskFiles, setMaskFiles] = useState(ListOfFiles);
  const [baseVideo, setBaseVideo] = useState<File>();

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [loadResponse, setLoadResponse] = useState<loadRequestReturn>();

  const prevShiftUUID = sessionStorage["shiftUUID"];
  const requestOptions = useRef<RequestInit>({})
  const requestHeaders = new Headers();


  const fetchLoad = useFetch(setFetching, setElevatedState, setLoadResponse, `/api/loadData`, () => requestOptions.current, loadResponse)

  
  useEffect(() => {setElevatedState((prev) => ({...prev, prebuiltShiftModel: ""}))}, []);

  useEffect(() => {
    if(!fetching) return;

    if(baseVideo === defaultVideo){
      setElevatedState((prev) => ({...prev, msg: "Make sure you have a priamry base media"}))
      return;
    }

    const data = new FormData();
    requestOptions.current = {
      method: 'POST',
      headers: {},
      credentials: "include",
    };

    for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
      data.append(`file${fileIndex}`, files[fileIndex]);
    }
    requestOptions.current.body = data;

    requestHeaders.append('trainingDataTypes', JSON.stringify(trainingDataTypes));
    requestOptions.current.headers = requestHeaders;

    fetchLoad()
  }, [fetching]);

  useEffect(() => {
    if(!loadResponse) return;
    setElevatedState((prev) => ({...prev, shiftUUID: loadResponse!.shiftUUID}))
    setElevatedState((prev) => ({...prev, msg: loadResponse!.msg}));
  }, [loadResponse]);

  useEffect(() => {
    if(!elevatedState().shiftUUID || elevatedState().shiftUUID === prevShiftUUID) return;
    history.push(`/${elevatedState().defaultTrainView === "basic" ? "train" : "advancedTrain"}`);
  }, [elevatedState().shiftUUID]);

  useEffect(() => {
    if(!baseVideo) return;

    setFiles([baseVideo, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1), ...fillArray("mask", maskFiles.length)])
  }, [baseVideo, baseFiles, maskFiles]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <h4>Base Face</h4>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="neumorphic borderRadius-2">
          <Row>
            <Col xs={11}></Col>
            <Col xs={1}>
              <FileDialog className="pr-4" id="baseVideoUpload" onChange={(event) => {
                const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                if(badExtensions.length > 0){
                  setElevatedState((prev) => ({...prev, msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
                }
                if(filteredFiles.length === 0){
                  setBaseVideo(defaultVideo)
                }
                else{
                  setBaseVideo(filteredFiles[0])
                }
              }}>&#x21c6;</FileDialog>
            </Col>
          </Row>
          <Media setElevatedState={setElevatedState} className="borderRadius-2 p-2" key={!baseVideo ? "": baseVideo.name} onDragOver={(event) => allowDrop(event)}
                 mediaSrc={baseVideo!} mediaType="video/mp4" droppable={true}/>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Extra Base Faces</h4>
          <div className="neumorphic borderRadius-2">
            <Row>
              <Col xs={11}></Col>
              <Col xs={1} >
                <FileDialog className="pr-4" id="baseFileUpload" mutipleSelect={true} onChange={(event) => {
                  const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                  if(badExtensions.length > 0){
                    setElevatedState((prev) => ({...prev,
                      msg: badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`}))
                  }
  
                  setBaseFiles((current) => [...current, ...filteredFiles])
                }}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 p-3" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setBaseFiles([...baseFiles, ...dropFiles(event, setElevatedState, validMediaFileExtesnions)])} elementsPerRow={2} key={baseFiles.length}>
              {baseFiles.map((file) => (
                <Media key={baseFiles.indexOf(file)} setElevatedState={setElevatedState} mediaSrc={file} mediaType="video/mp4"/>
              ))}
            </MediaList>
          </div>
        </Col>
        <Col>
          <h4>Mask Face</h4>
          <div className="neumorphic borderRadius-2">
            <Row>
              <Col xs={11}></Col>
              <Col xs={1} >
                <FileDialog className="pr-4" id="maskFileUpload" mutipleSelect={true} onChange={(event) => {
                  const [filteredFiles, badExtensions] = validateFileList(event.target.files!, validMediaFileExtesnions)

                  if(badExtensions.length > 0){
                    setElevatedState((prev) => ({...prev,
                      msg: badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`}))
                  }
  
                  setMaskFiles((current) => [...current, ...filteredFiles])
                }}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 borderRadius-2 p-3" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setMaskFiles([...maskFiles, ...dropFiles(event, setElevatedState, validMediaFileExtesnions)])} elementsPerRow={2} key={maskFiles.length}>
              {maskFiles.map((file) => (
                <Media key={maskFiles.indexOf(file)} setElevatedState={setElevatedState} mediaSrc={file} mediaType="video/mp4"/>
              ))}
            </MediaList>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={2}></Col>
        <Col xs={8}>
          <Button className="p-2 mt-2 mb-2 borderRadius-2 w-100" disabled={fetching} onClick={() => setFetching(true)}>Load</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}