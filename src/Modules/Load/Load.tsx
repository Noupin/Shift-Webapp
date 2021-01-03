//Third Party Imports
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//First Party Imports
import { Button } from '../../Components/Button/Button';
import { IElevatedPageState } from "../../Interfaces/PageState";


interface loadRequestReturn {
  msg: string,
  shiftUUID: string
} 

interface trainRequestReturn {
  msg: string
}

interface inferRequestReturn {
  msg: string,
  testImage: string
}

const ListOfFiles: File[] = [];
const ListOfDataType: string[] = []

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

  const trainRequestOption: RequestInit = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({shiftUUID: props.shiftUUID,
                          usePTM: false,
                          prebuiltShiftModel: ""})
  };

  const inferRequestOption: RequestInit = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({shiftUUID: props.shiftUUID,
                          usePTM: false,
                          prebuiltShiftModel: ""})
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

  const trainShift = () => {
    fetch(`/api/train`, trainRequestOption).then(res => res.json()).then((data: trainRequestReturn) => {
      console.log(data);
      props.setMsg(data.msg);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const shift = () => {
    fetch(`/api/inference`, inferRequestOption).then(res => res.json()).then((data: inferRequestReturn) => {
      setImage(data.testImage);
      props.setMsg(data.msg);
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }


  return (
    <Container>
      <Row>
        <Col>
          <input type="file" name="file" onChange={(event) => setFiles([...files, event.target.files![0]])}/>
          <Button onClick={sendFile}>Load</Button>
        </Col>
        <Col>
          {files.map((currentFile, currentIndex) => (
            <p onClick={() => setFiles(files.filter((file, index) => index !== currentIndex))}>{currentFile!.name}</p> //Empty list error
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setDataTypes([...dataTypes, "base"])}>Base</Button>
        </Col>
        <Col>
          <Button onClick={() => setDataTypes([...dataTypes, "mask"])}>Mask</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/train" className="w-100">
            <Button>Time To Train?</Button>
          </Link>
        </Col>
        <Col>
          <Button onClick={shift}>Inference</Button>
        </Col>
      </Row>
      <Row>
        <img src={`data:image/jpeg;base64,${image}`} alt="Img" />
      </Row>
    </Container>
  );
}