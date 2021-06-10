/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

//First Party Imports
import { ShiftAPIInstance } from '../Helpers/Api';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../Swagger/models/IndividualShiftGetResponse';
import { Media } from '../Components/Media/Media';
import { Image } from '../Components/Image/Image';
import { Button } from '../Components/Button/Button';
import Verified from "../Assets/verified_checkmark.svg";
import Admin from "../Assets/admin.svg";
import LeftCurvedArrow from "../Assets/LeftCurvedArrow.svg"
import RightCurvedArrow from "../Assets/RightCurvedArrow.svg"
import { pageTitles, videoTypes } from '../constants';
import { TextBox } from '../Components/TextBox/TextBox';
import { DeleteIndivdualShiftRequest, GetIndivdualShiftRequest, IndividualShiftPatchRequest,
  IndividualShiftPatchResponse,
  PatchIndivdualShiftRequest } from '../Swagger';


export function ShiftPage (props: IElevatedStateProps){
  const {setElevatedState} = props;
  const history = useHistory()

  let { uuid } = useParams<GetIndivdualShiftRequest>();
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState("")


  const [shiftGetResponse, setShiftGetResponse] = useState<IndividualShiftGetResponse>();
  const [shiftPatchResponse, setShiftPatchResponse] = useState<IndividualShiftPatchResponse>();
  const [shiftMediaURL, setShiftMediaURL] = useState("");
  const [baseMediaURL, setBaseMediaURL] = useState("");
  const [maskMediaURL, setMaskMediaURL] = useState("");
  
  
  useEffect(() => {
    document.title = pageTitles[""]
  }, [])

  useEffect(() => {
    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    ShiftAPIInstance.getIndivdualShift(urlParams).then((value) => {
      setShiftGetResponse(value!)
    })

  }, [uuid, shiftPatchResponse]);

  useEffect(() => {
    if (!shiftGetResponse) return;

    document.title = pageTitles["shift"](shiftGetResponse.shift!.author.username, shiftGetResponse.shift!.title)
    setTitle(shiftGetResponse.shift!.title)

    setShiftMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.baseMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.maskMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.maskMediaFilename!}`)
  }, [shiftGetResponse])

  useEffect(() => {
    if(!saving) return;
  
    async function patchUser(){
      const requestBody: IndividualShiftPatchRequest = {
        data: { title: title }
      }

      const urlParams: PatchIndivdualShiftRequest = {
        uuid: uuid,
        body: requestBody
      }
  
      await ShiftAPIInstance.patchIndivdualShift(urlParams).then((value) => {
        setShiftPatchResponse(value!)
      })
    }

    patchUser()
    setSaving(false)
  }, [saving])

  useEffect(() => {
    if (!shiftPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: shiftPatchResponse.msg!}))
  }, [shiftPatchResponse])


  function deleteShift(){
    const urlParams: DeleteIndivdualShiftRequest = {
      uuid: uuid
    }

    ShiftAPIInstance.deleteIndivdualShift(urlParams).then((value) => {
      setElevatedState((prev) => ({...prev, msg: value!.msg!}))
    })
    history.push("/")
  }

  let userComponent = <></>
  let shiftTitleComponent = <></>
  let editShiftComponent = <></>

  if(shiftGetResponse){
    if(editing){
      shiftTitleComponent = (
        <>
          <TextBox className="text-left borderRadius-2 p-2" type="text"
            defaultValue={title} placeholder="Title" onBlur={(event) => setTitle(event.target.value)}/>
          {shiftGetResponse.shift!.verified ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain"
                imageSrc={Verified} alt="Verified"/> : <></>}
        </>
      )
    }
    else{
      shiftTitleComponent = (
        <h1 className="text-left">
          {title} {shiftGetResponse.shift!.verified ?
          <Image style={{height: "0.75em", width: "auto"}} 
              className="object-fit-contain"
              imageSrc={Verified} alt="Verified"/> : <></>}
        </h1>
      )
    }

    if(shiftGetResponse.owner){
      editShiftComponent = (
        <Row>
          <Col>
            {editing ?
            <Button className="borderRadius-2 p-2 w-100 mx-2"
            onClick={() => {
              setEditing(false);
              setSaving(true)
            }}>
              Save
            </Button>
            :
            <Button className="borderRadius-2 p-2 w-100 mx-2" onClick={() => setEditing(true)}>
              Edit
            </Button> }
          </Col>
          <Col>
            <Button className="borderRadius-2 p-2 text-danger w-100 mx-2"
                    onClick={deleteShift}>
              Delete
            </Button>
          </Col>
        </Row>
      )
    }
    userComponent = (
      <div onClick={() => history.push(`/user/${shiftGetResponse.shift!.author.username}`)}
        style={{cursor: "pointer"}}>
        <Row>
          <h4>
            {shiftGetResponse.shift!.author.username} {shiftGetResponse.shift!.author.verified! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain"
                imageSrc={Admin} alt="Admin"/> : <></>} {shiftGetResponse.shift!.author.admin! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
          </h4>
        </Row>
        <Row>
          <Media className="neumorphic borderRadius-3 p-2"
                 srcString={`/api/content/image/${shiftGetResponse.shift!.author.mediaFilename!}`}
                 setElevatedState={setElevatedState}/>
        </Row>
      </div>
    )
  }

  return (
    <Container>
      <Row>
        <Col xs={9} className="p-2">
          <Row>
            <Col xs={1}></Col>
            <Col xs={5}>
              {shiftTitleComponent}
            </Col>
            <Col xs={4}>
              {editShiftComponent}
            </Col>
            <Col xs={1}></Col>
          </Row>
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
        <Col xs={3} className="p-2">
          {userComponent}
        </Col>
      </Row>
    </Container>
  );
}