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
import { uiStyleTypeArray, trainViewTypeArray } from '../../Types/FrontEndTypes'

export function Settings (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;


  return (
    <Container>
      <h2>Settings</h2>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Dark Mode</Col>
        <Col xs={6} className="justify-content-end">
          <Checkbox checked={elevatedState.frontEndSettings.darkMode}
            onChange={() => setElevatedState(prev => (
              {...prev, frontEndSettings: {...prev.frontEndSettings,
                                           darkMode: !prev.frontEndSettings.darkMode}
              })
            )}/>
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">UI Style</Col>
        <Col xs={6} className="justify-content-end">
        <Dropdown options={uiStyleTypeArray}
            defaultOption={elevatedState.frontEndSettings.uiStyle}
            onOptionChange={(value) => setElevatedState(prev => (
              {...prev, frontEndSettings: {...prev.frontEndSettings,
                                           uiStyle: value as unknown as IFrontEndSettings["uiStyle"]}
              })
            )}/>
        </Col>
      </Row>
      {currentUser().canTrain! && <>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Use PTM</Col>
        <Col xs={6} className="justify-content-end">
          <Checkbox checked={elevatedState.frontEndSettings.usePTM}
            onChange={() => setElevatedState(prev => (
              {...prev, frontEndSettings: {...prev.frontEndSettings,
                                           usePTM: !prev.frontEndSettings.usePTM}
              })
            )}/>
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Training Shift</Col>
        <Col xs={6} className="justify-content-end">
          <Checkbox checked={elevatedState.frontEndSettings.trainingShift}
              onChange={() => setElevatedState(prev => (
                {...prev, frontEndSettings: {...prev.frontEndSettings,
                                             trainingShift: !prev.frontEndSettings.trainingShift}
                })
              )}/>
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs={6} className="text-align-left">Training Type</Col>
        <Col xs={6} className="justify-content-end">
          <Dropdown options={trainViewTypeArray}
            defaultOption={elevatedState.frontEndSettings.trainView}
            onOptionChange={(value) => setElevatedState(prev => (
              {...prev, frontEndSettings: {...prev.frontEndSettings,
                                           trainView: value as unknown as IFrontEndSettings["trainView"]}
              })
            )}/>
        </Col>
      </Row></>}
    </Container>
  );
}