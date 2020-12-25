//Third Party Imports
import React from 'react';
import { Container, Row } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';

export const Load = () => {

  const requestOptions: RequestInit = {
    method: 'POST',
    credentials: "include",
  };

  const uploadFile = (event: any) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files[0].name);
    requestOptions.body = data;
  }

  const sendFile = () => {
    console.log(requestOptions);
    fetch(`/api/train`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <Container>
      <Row>
        <input type="file" name="file" onChange={uploadFile}/>
        <Button onClick={sendFile}>Upload</Button>
      </Row>
    </Container>
  );
}