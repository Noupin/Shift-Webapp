import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
        <button className="neumorphic" onClick={logoutUser}>Logout</button>
      </Row>
    </Container>
  );
}