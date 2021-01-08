//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { MediaList } from "../../Components/MediaList/MediaList";
import { FileDialog } from "../../Components/FileDialog/FileDialog"
import { defaultVideo, validMediaFileExtesnions } from "../../constants";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { fileListToList } from '../../Helpers/Files';
import { fillArray } from "../../Helpers/Arrays";
import { useFetch } from "../../Helpers/Fetch";


interface loadRequestReturn {
  msg: string,
  shiftUUID: string
}

const ListOfFiles: File[] = [];
const ListOfDataType: string[] = [];


export const Load = (props: IElevatedPageState) => {
  const [trainingDataTypes, setTrainingDataTypes] = useState(ListOfDataType);
  const [files, setFiles] = useState(ListOfFiles);
  const [baseFiles, setBaseFiles] = useState(ListOfFiles);
  const [maskFiles, setMaskFiles] = useState(ListOfFiles);
  const [baseVideo, setBaseVideo] = useState(defaultVideo);

  const history = useHistory()

  const [fetching, setFetching] = useState(false);
  const [loadResponse, setLoadResponse] = useState<loadRequestReturn>();

  const prevShiftUUID = sessionStorage["shiftUUID"];
  let requestOptions: RequestInit = {};
  const requestHeaders = new Headers();


  const apiFetch = useFetch(setFetching, props.setError, setLoadResponse, `/api/loadData`, () => requestOptions, loadResponse)

  
  useEffect(() => {
    if(!fetching) return;

    if(baseVideo === defaultVideo){
      props.setMsg("Make sure you have a priamry base media")
      return;
    }

    const data = new FormData();
    requestOptions = {
      method: 'POST',
      headers: {},
      credentials: "include",
    };

    for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
      data.append(`file${fileIndex}`, files[fileIndex]);
    }
    requestOptions.body = data;

    requestHeaders.append('trainingDataTypes', JSON.stringify(trainingDataTypes));
    requestOptions.headers = requestHeaders;

    apiFetch()
  }, [fetching]);

  useEffect(() => {
    if(!loadResponse) return;
    props.setShiftUUID(loadResponse!.shiftUUID)
    props.setMsg(loadResponse!.msg);
  }, [loadResponse]);

  useEffect(() => {
    if(!props.shiftUUID() || props.shiftUUID() === prevShiftUUID) return;
    history.push("/train");
  }, [props.shiftUUID()]);

  useEffect(() => {
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
                if(!validMediaFileExtesnions.includes(event.target.files![0].name.split('.').pop()!)){
                  props.setMsg(`That file type ${event.target.files![0].name.split('.').pop()!} is not allowed to be selected`)
                }
                else{
                  setBaseVideo(event.target.files![0])
                }
              }}>&#x21c6;</FileDialog>
            </Col>
          </Row>
          <Media elevatedProps={props} className="borderRadius-2 p-2" key={baseVideo.name} onDragOver={(event) => allowDrop(event)}
                 onDrop={(event) => setBaseVideo(dropFiles(event, props, validMediaFileExtesnions)[0])} mediaSrc={baseVideo} mediaType="video/mp4" droppable={true}/>
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
                  const filteredFiles = fileListToList(event.target.files!).filter((file) => !validMediaFileExtesnions.includes(file.name.split('.').pop()!))
                  if(filteredFiles.length > 0){
                    const badExtensions = filteredFiles.map(file => file.name.split('.').pop()!)
                    props.setMsg(badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`)
                  }
                  else{
                    setBaseFiles((current) => [...current, ...fileListToList(event.target.files!)])
                  }
                }}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 p-3" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setBaseFiles([...baseFiles, ...dropFiles(event, props, validMediaFileExtesnions)])} elementsPerRow={2} key={baseFiles.length}>
              {baseFiles.map((file) => (
                <Media elevatedProps={props} mediaSrc={file} mediaType="video/mp4"/>
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
                  const filteredFiles = fileListToList(event.target.files!).filter((file) => !validMediaFileExtesnions.includes(file.name.split('.').pop()!))
                  console.log(filteredFiles)
                  if(filteredFiles.length > 0){
                    const badExtensions = filteredFiles.map(file => file.name.split('.').pop()!)
                    console.log(badExtensions)
                    props.setMsg(badExtensions.length <= 1 ? `The file type ${badExtensions[0]} is not allowed to be selected` : `The file types ${badExtensions} are not allowed to be selected`)
                  }
                  else{
                    setMaskFiles((current) => [...current, ...fileListToList(event.target.files!)])
                  }
                }}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 borderRadius-2 p-3" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setMaskFiles([...maskFiles, ...dropFiles(event, props, validMediaFileExtesnions)])} elementsPerRow={2} key={maskFiles.length}>
              {maskFiles.map((file) => (
                <Media elevatedProps={props} mediaSrc={file} mediaType="video/mp4"/>
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