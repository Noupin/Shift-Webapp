/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';

export function Settings (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  return (
    <Container className="d-flex justify-content-center h-100 flex-column">
      <h2>Settings</h2>
    </Container>
  );
}