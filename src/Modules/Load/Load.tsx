//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { Media } from '../../Components/Media/Media';
import { MediaList } from "../../Components/MediaList/MediaList";
import { defaultVideo } from "../../Helpers/defaultMedia";


interface loadRequestReturn {
  msg: string,
  shiftUUID: string
} 

const ListOfFiles: File[] = [];
const ListOfDataType: string[] = [];

export const Load = (props: IElevatedPageState) => {

  const [dataTypes, setDataTypes] = useState(ListOfDataType);
  const [image, setImage] = useState("");
  const [files, setFiles] = useState(ListOfFiles);

  const requestHeaders = new Headers();
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {},
    credentials: "include",
  };

  const sendFile = () => {
    const data = new FormData();
    for (var fileIndex = 0; fileIndex < files.length; fileIndex++){
      console.log(files[fileIndex].name);
      data.append(`file${fileIndex}`, files[fileIndex]);
    }
    requestOptions.body = data;

    requestHeaders.append('dataTypes', JSON.stringify(dataTypes));
    requestOptions.headers = requestHeaders;

    console.log(requestOptions);
    console.log(dataTypes);

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
          <Media className="neumorphic borderRadius-2 mt-2 mb-2" mediaSrc={defaultVideo} mediaType="video/mp4" droppable={true}/>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>More Base</h4>
          <MediaList className="mt-2 borderRadius-2 p-3" insetNeumorphic={true} elementsPerRow={2}>
            <Media mediaSrc={defaultVideo} mediaType="video/mp4" droppable={true}/>
            <Media mediaSrc={defaultVideo} mediaType="video/mp4" droppable={true}/>
          </MediaList>
        </Col>
        <Col>
          <h4>Mask Face</h4>
          <MediaList className="mt-2 borderRadius-2 p-3" insetNeumorphic={true} elementsPerRow={2}>
            <Media mediaSrc={defaultVideo} mediaType="video/mp4" droppable={true}/>
            <Media mediaSrc={defaultVideo} mediaType="video/mp4" droppable={true}/>
          </MediaList>
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