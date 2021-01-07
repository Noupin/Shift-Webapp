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
import { defaultVideo } from "../../Helpers/defaultMedia";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { fileListToList } from '../../Helpers/Files';
import { fillArray } from "../../Helpers/Arrays";
import { useFetch } from "../../Hooks/Fetch";


interface loadRequestReturn {
  msg: string,
  shiftUUID: string
}

let loadResponse: loadRequestReturn = {msg: "", shiftUUID: ""}

const ListOfFiles: File[] = [];
const ListOfDataType: string[] = [];


export const Load = (props: IElevatedPageState) => {
  const [trainingDataTypes, setTrainingDataTypes] = useState(ListOfDataType);
  const [files, setFiles] = useState(ListOfFiles);
  const [baseFiles, setBaseFiles] = useState(ListOfFiles);
  const [maskFiles, setMaskFiles] = useState(ListOfFiles);
  const [baseVideo, setBaseVideo] = useState(defaultVideo);

  const history = useHistory()
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(loadResponse);

  const requestHeaders = new Headers();


  async function load(){
    const data = new FormData();
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {},
      credentials: "include",
    };

    for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
      console.log(files[fileIndex].name);
      data.append(`file${fileIndex}`, files[fileIndex]);
    }
    requestOptions.body = data;

    requestHeaders.append('trainingDataTypes', JSON.stringify(trainingDataTypes));
    requestOptions.headers = requestHeaders;

    apiFetch(`/api/loadData`, requestOptions)
    props.setMsg(apiResponse.msg)
    props.setShiftUUID(apiResponse.shiftUUID)
    
    //history.push("/train")
  }


  useEffect(() => {
    setFiles([baseVideo, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1), ...fillArray("mask", maskFiles.length)])
  }, [baseVideo, baseFiles, maskFiles]);

  useEffect(() => {
		console.error(apiError);
	}, [apiError]);


  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <h4>Base Face</h4>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8} className="neumorphic borderRadius-2">
          <Row>
            <Col xs={11}></Col>
            <Col xs={1} >
              <FileDialog className="pr-4" id="baseVideoUpload" onChange={(event) => setBaseVideo(event.target.files![0])}>&#x21c6;</FileDialog>
            </Col>
          </Row>
          <Media className="borderRadius-2 p-2" key={baseVideo.name} onDragOver={(event) => allowDrop(event)}
                 onDrop={(event) => setBaseVideo(dropFiles(event)[0])} mediaSrc={baseVideo} mediaType="video/mp4" droppable={true}/>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>More Base</h4>
          <div className="neumorphic borderRadius-2">
            <Row>
              <Col xs={11}></Col>
              <Col xs={1} >
                <FileDialog className="pr-4" id="baseFileUpload" mutipleSelect={true} onChange={(event) => setBaseFiles((current) => [...current, ...fileListToList(event.target.files!)])}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 p-3" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setBaseFiles([...baseFiles, ...dropFiles(event)])} elementsPerRow={2} key={baseFiles.length}>
              {baseFiles.map((file) => (
                <Media mediaSrc={file} mediaType="video/mp4"/>
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
                <FileDialog className="pr-4" id="maskFileUpload" mutipleSelect={true} onChange={(event) => setMaskFiles((current) => [...current, ...fileListToList(event.target.files!)])}>&#43;</FileDialog>
              </Col>
            </Row>
            <MediaList className="mt-2 borderRadius-2 p-3" onDragOver={(event) => allowDrop(event)}
                       onDrop={(event) => setMaskFiles([...maskFiles, ...dropFiles(event)])} elementsPerRow={2} key={maskFiles.length}>
              {maskFiles.map((file) => (
                <Media mediaSrc={file} mediaType="video/mp4"/>
              ))}
            </MediaList>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={2}></Col>
        <Col xs={8}>
          <Button className="p-2 mt-2 mb-2 borderRadius-2 w-100" disabled={apiLoading} onClick={load}>Load</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}