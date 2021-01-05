//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { MediaList } from "../../Components/MediaList/MediaList";
import { defaultVideo } from "../../Helpers/defaultMedia";
import { dropFiles, allowDrop } from '../../Helpers/dragAndDrop';
import { openFileDialog } from '../../Helpers/FileSelector';
import { fillArray } from "../../Helpers/Arrays";


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

  const requestHeaders = new Headers();
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {},
    credentials: "include",
  };

  useEffect(() => {
    setFiles([baseVideo, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1), ...fillArray("mask", maskFiles.length)])
  }, [baseVideo, baseFiles, maskFiles]);

  const sendFile = () => {
    const data = new FormData();
    for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
      console.log(files[fileIndex].name);
      data.append(`file${fileIndex}`, files[fileIndex]);
    }
    requestOptions.body = data;

    requestHeaders.append('trainingDataTypes', JSON.stringify(trainingDataTypes));
    requestOptions.headers = requestHeaders;

    console.log(requestOptions);

    fetch(`/api/loadData`, requestOptions).then(res => res.json()).then((data: loadRequestReturn) => {
      console.log(data);
      props.setMsg(data.msg);
      props.setShiftUUID(data.shiftUUID);
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <h2>Base Face</h2>
      <Row>
      <Col xs={2}></Col>
        <Col xs={8}>
          <Media className="neumorphic borderRadius-2 mt-2 mb-2" onDragOver={(event) => allowDrop(event)}
                      onDrop={(event) => setBaseVideo(dropFiles(event)[0])} mediaSrc={baseVideo} mediaType="video/mp4" droppable={true}/>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>More Base</h4>
          <div className="neumorphic borderRadius-2">
            <h4 className="text-right pr-2" onClick={(event) => {openFileDialog(event, baseFiles, setBaseFiles)}}>&#43;</h4>
            <MediaList className="mt-2 p-3" onDragOver={(event) => allowDrop(event)}
                      onDrop={(event) => setBaseFiles([...baseFiles, ...dropFiles(event)])} elementsPerRow={2} key={baseFiles.length}>
              {baseFiles.map((file) => (
                <Media mediaSrc={file} mediaType="video/mp4" droppable={true}/>
              ))}
            </MediaList>
          </div>
        </Col>
        <Col>
          <h4>Mask Face</h4>
          <div className="neumorphic borderRadius-2">
            <h4 className="text-right pr-2" onClick={(event) => {openFileDialog(event, maskFiles, setMaskFiles);}}>&#43;</h4>
            <MediaList className="mt-2 borderRadius-2 p-3" onDragOver={(event) => allowDrop(event)}
                      onDrop={(event) => setMaskFiles([...maskFiles, ...dropFiles(event)])} elementsPerRow={2} key={maskFiles.length}>
              {maskFiles.map((file) => (
                <Media mediaSrc={file} mediaType="video/mp4" droppable={true}/>
              ))}
            </MediaList>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={2}></Col>
        <Col xs={8}>
          <Button className="p-2 mt-2 mb-2 borderRadius-2" onClick={sendFile}>Load</Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
}