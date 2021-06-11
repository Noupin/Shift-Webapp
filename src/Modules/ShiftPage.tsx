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
import LeftCurvedArrow from "../Assets/LeftCurvedArrow.svg"
import RightCurvedArrow from "../Assets/RightCurvedArrow.svg"
import { pageTitles, videoTypes } from '../constants';
import { DeleteIndivdualShiftRequest, GetIndivdualShiftRequest, IndividualShiftPatchRequest,
  IndividualShiftPatchResponse, PatchIndivdualShiftRequest } from '../Swagger';
import { ShiftButtonsComponent } from '../Components/Shift/ShiftButtonsComponent';
import { ShiftUserComponent } from '../Components/Shift/ShiftUserComponent';
import { ShiftTitleComponent } from '../Components/Shift/ShiftTitleComponent';


export function ShiftPage (props: IElevatedStateProps){
  const {setElevatedState} = props;
  const history = useHistory();

  let { uuid } = useParams<GetIndivdualShiftRequest>();
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [shiftChanges, setShiftChanges] = useState<IndividualShiftPatchRequest["data"]>({})


  const [shiftGetResponse, setShiftGetResponse] = useState<IndividualShiftGetResponse>();
  const [shiftPatchResponse, setShiftPatchResponse] = useState<IndividualShiftPatchResponse>();
  const [shiftMediaURL, setShiftMediaURL] = useState("");
  const [baseMediaURL, setBaseMediaURL] = useState("");
  const [maskMediaURL, setMaskMediaURL] = useState("");
  
  
  useEffect(() => {
    document.title = pageTitles[""]
  }, [])

  useEffect(() => {
    if(editing) return;

    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    ShiftAPIInstance.getIndivdualShift(urlParams).then((value) => {
      setShiftGetResponse(value!)
    })

  }, [uuid, shiftPatchResponse, editing]);

  useEffect(() => {
    if (!shiftGetResponse) return;

    document.title = pageTitles["shift"](shiftGetResponse.shift!.author.username, shiftGetResponse.shift!.title)
    setShiftChanges(prev => ({...prev, title: shiftGetResponse.shift!.title}))

    setShiftMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.baseMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.maskMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.maskMediaFilename!}`)
  }, [shiftGetResponse])

  useEffect(() => {
    if(!saving) return;
  
    async function patchUser(){
      const requestBody: IndividualShiftPatchRequest = {
        data: shiftChanges
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


  return (
    <Container>
      <Row>
        <Col xs={9} className="p-2">
          <Row>
            <Col xs={1}></Col>
            <Col xs={5}>
              {shiftGetResponse ? 
                <ShiftTitleComponent owner={shiftGetResponse.owner} shift={shiftGetResponse.shift}
                  editing={editing} shiftChanges={shiftChanges} setShiftChanges={setShiftChanges}/>
                : <></>}
            </Col>
            <Col xs={4}>
              {shiftGetResponse && shiftGetResponse.owner ? 
                <ShiftButtonsComponent editing={editing} setEditing={setEditing}
                  setSaving={setSaving} deleteShift={deleteShift}/>
                : <></>}
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
          {shiftGetResponse ?
            <ShiftUserComponent owner={shiftGetResponse.owner} shift={shiftGetResponse.shift}
              setElevatedState={setElevatedState} />
          : <></>}
        </Col>
      </Row>
    </Container>
  );
}