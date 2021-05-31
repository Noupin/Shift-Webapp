/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

//First Party Imports
import { ShiftAPIInstance } from '../Helpers/Api';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../Swagger/models/IndividualShiftGetResponse';
import { GetIndivdualShiftRequest } from '../Swagger';
import { Media } from '../Components/Media/Media';
import { Image } from '../Components/Image/Image';
import { Button } from '../Components/Button/Button';
import Verified from "../Assets/verified_checkmark.svg";
import Admin from "../Assets/admin.svg";
import LeftCurvedArrow from "../Assets/LeftCurvedArrow.svg"
import RightCurvedArrow from "../Assets/RightCurvedArrow.svg"
import { videoTypes } from '../constants';


export function ShiftPage (props: IElevatedStateProps){
  const {setElevatedState} = props;
  const history = useHistory()

  let { uuid } = useParams<GetIndivdualShiftRequest>();


  const [shiftResponse, setShiftResponse] = useState<IndividualShiftGetResponse>();
  const [shiftMediaURL, setShiftMediaURL] = useState("");
  const [baseMediaURL, setBaseMediaURL] = useState("");
  const [maskMediaURL, setMaskMediaURL] = useState("");
  
  
  useEffect(() => {
    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    ShiftAPIInstance.getIndivdualShift(urlParams).then((value) => {
      setShiftResponse(value!)
    })
  }, [uuid]);

  useEffect(() => {
    if (!shiftResponse) return;

    setShiftMediaURL(`${videoTypes.indexOf(shiftResponse.shift!.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${videoTypes.indexOf(shiftResponse.shift!.baseMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${videoTypes.indexOf(shiftResponse.shift!.maskMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftResponse.shift!.maskMediaFilename!}`)
  }, [shiftResponse])

  let userComponent = <></>
  let shiftTitleComponent = <></>
  let editShiftComponent = <></>

  if(shiftResponse){
    shiftTitleComponent = (
      <h1>
        {shiftResponse.shift!.title} {shiftResponse.shift!.verified ?
        <Image style={{height: "0.75em", width: "auto"}} 
            className="object-fit-contain"
            imageSrc={Admin} alt="Admin"/> : <></>}
      </h1>
    )
    if(shiftResponse.owner){
      editShiftComponent = (
        <Row className="mt-2">
          <Col>
            <Button className="borderRadius-2 p-2 w-100 mx-1">Edit</Button>
          </Col>
          <Col>
            <Button className="borderRadius-2 p-2 text-danger w-100 mx-1">Delete</Button>
          </Col>
        </Row>
      )
    }
    userComponent = (
      <div onClick={() => history.push(`/user/${shiftResponse.shift!.author.username}`)}
        style={{cursor: "pointer"}}>
        <Row>
          <h4>
            {shiftResponse.shift!.author.username} {shiftResponse.shift!.author.verified! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain"
                imageSrc={Admin} alt="Admin"/> : <></>} {shiftResponse.shift!.author.admin! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
          </h4>
        </Row>
        <Row>
          <Media className="neumorphic borderRadius-3 p-2"
                 srcString={`/api/content/image/${shiftResponse.shift!.author.mediaFilename!}`}
                 setElevatedState={setElevatedState}/>
        </Row>
      </div>
    )
  }

  return (
    <Container>
      <Row className="justify-content-center">
        {shiftTitleComponent}
      </Row>
      <Row>
        <Col xs={3} className="p-2">
          {userComponent}
          {editShiftComponent}
        </Col>
        <Col xs={9} className="p-2">
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Media className="neumorphic borderRadius-3 p-2" srcString={shiftMediaURL}
                setElevatedState={setElevatedState}/>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={4}>
              <Image style={{height: "5em", width: "auto"}} className="m-1"
                imageSrc={LeftCurvedArrow} alt="LeftArrow"/>
            </Col>
            <Col xs={4}>
              <Image style={{height: "5em", width: "auto"}} className="m-1"
                imageSrc={RightCurvedArrow} alt="RightArrow"/>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={5}>
              <Media className="neumorphic borderRadius-3 p-2" srcString={baseMediaURL}
                setElevatedState={setElevatedState}/>
            </Col>
            <Col xs={5}>
              <Media className="neumorphic borderRadius-3 p-2" srcString={maskMediaURL}
                setElevatedState={setElevatedState}/>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}