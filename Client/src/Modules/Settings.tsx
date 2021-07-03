/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { Checkbox } from '../Components/Checkbox/Checkbox';
import { Dropdown } from '../Components/Dropdown/Dropdown';

export function Settings (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;


  return (
    <Container>
      <h2>Settings</h2>
      {elevatedState().canTrain && <>
      <Row>
        <Col xs={6}>Use PTM</Col>
        <Col xs={6}>
          <Checkbox checked={elevatedState().usePTM}
            onChange={() => setElevatedState(prev => ({...prev, usePTM: !elevatedState().usePTM}))}/>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>Training Shift</Col>
        <Col xs={6}>
          <Checkbox checked={elevatedState().trainingShift}
              onChange={() => setElevatedState(prev => ({...prev, trainingShift: !elevatedState().trainingShift}))}/>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>Training Type</Col>
        <Col xs={6}>
          <Dropdown options={['basic', 'advanced']}/>
        </Col>
      </Row></>}
    </Container>
  );
}