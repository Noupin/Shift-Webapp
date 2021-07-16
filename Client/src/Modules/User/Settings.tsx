/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//First Party Imports
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { Dropdown } from '../../Components/Dropdown/Dropdown';
import { IFrontEndSettings } from '../../Interfaces/FrontEndSettings';
import { currentUser } from '../../Helpers/User';

export function Settings (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;


  return (
    <Container>
      <h2>Settings</h2>
      {currentUser().canTrain! && <>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Use PTM</Col>
        <Col xs={6} className="justify-content-end">
          <Checkbox checked={elevatedState().usePTM}
            onChange={() => setElevatedState(prev => ({...prev, usePTM: !elevatedState().usePTM}))}/>
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Training Shift</Col>
        <Col xs={6} className="justify-content-end">
          <Checkbox checked={elevatedState().trainingShift}
              onChange={() => setElevatedState(prev => ({...prev, trainingShift: !elevatedState().trainingShift}))}/>
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Training Type</Col>
        <Col xs={6} className="justify-content-end">
          <Dropdown options={['basic', 'advanced']}
            defaultOption={elevatedState().defaultTrainView}
            onOptionChange={(value) => setElevatedState(prev => ({...prev, defaultTrainView: value as unknown as IFrontEndSettings["defaultTrainView"]}))}/>
        </Col>
      </Row></>}
    </Container>
  );
}