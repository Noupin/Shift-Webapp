//Third Party Imports
import React from 'react';
import { Container, Row } from 'react-bootstrap';

//First Party Imports
import { Button } from '../../Components/Button/Button';


export const Logout = () => {

  const logoutUser = () => {
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: "include",
    };

    fetch(`/api/users/logout`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
    });
  }

  return (
    <Container>
      <Row>
        <Button onClick={logoutUser}>Logout</Button>
      </Row>
    </Container>
  );
}