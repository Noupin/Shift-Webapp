/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../Swagger/models/IndividualShiftGetResponse';
import { Media } from '../Components/Media/Media';
import { Image } from '../Components/Image/Image';
import LeftCurvedArrow from "../Assets/LeftCurvedArrow.svg"
import RightCurvedArrow from "../Assets/RightCurvedArrow.svg"
import { pageTitles, videoTypes } from '../constants';
import { DeleteIndivdualShiftRequest, GetIndivdualShiftRequest, IndividualShiftDeleteResponse, IndividualShiftPatchRequest,
  IndividualShiftPatchResponse, PatchIndivdualShiftRequest } from '../Swagger';
import { ShiftButtonsComponent } from '../Components/Shift/ShiftButtonsComponent';
import { ShiftUserComponent } from '../Components/Shift/ShiftUserComponent';
import { ShiftTitleComponent } from '../Components/Shift/ShiftTitleComponent';
import { Button } from '../Components/Button/Button';
import { useFetch } from '../Hooks/Fetch';


export function ShiftPage (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  const history = useHistory();

  let { uuid } = useParams<GetIndivdualShiftRequest>();
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [shiftChanges, setShiftChanges] = useState<IndividualShiftPatchRequest["data"]>({})


  const [shiftGetResponse, setShiftGetResponse] = useState<IndividualShiftGetResponse>();
  const [shiftPatchResponse, setShiftPatchResponse] = useState<IndividualShiftPatchResponse>();
  const [shiftDeleteResponse, setShiftDeleteResponse] = useState<IndividualShiftDeleteResponse>();
  const [shiftMediaURL, setShiftMediaURL] = useState("");
  const [baseMediaURL, setBaseMediaURL] = useState("");
  const [maskMediaURL, setMaskMediaURL] = useState("");
  
  const fetchGetIndividualShift = useFetch(elevatedState().APIInstaces.Shift,
                                           elevatedState().APIInstaces.Shift.getIndivdualShift,
                                           elevatedState, setElevatedState, setShiftGetResponse)
  const fetchPatchIndividualShift = useFetch(elevatedState().APIInstaces.Shift,
                                             elevatedState().APIInstaces.Shift.patchIndivdualShift,
                                             elevatedState, setElevatedState, setShiftPatchResponse, setSaving)
  const fetchDeleteIndividualShift = useFetch(elevatedState().APIInstaces.Shift,
                                              elevatedState().APIInstaces.Shift.deleteIndivdualShift,
                                              elevatedState, setElevatedState, setShiftDeleteResponse)
  
  useEffect(() => {
    document.title = pageTitles[""]
  }, [])

  useEffect(() => {
    if(editing || saving) return;

    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    fetchGetIndividualShift(urlParams)
  }, [uuid, shiftPatchResponse, editing, elevatedState().APIInstaces.apiKey]);

  useEffect(() => {
    if (!shiftGetResponse) return;

    document.title = pageTitles["shift"](shiftGetResponse.shift!.author.username, shiftGetResponse.shift!.title)

    setShiftMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.mediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.baseMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${videoTypes.indexOf(shiftGetResponse.shift!.maskMediaFilename!.split('.').pop()!) !== -1 ? '/api/content/video/' : '/api/content/image/'}${shiftGetResponse.shift!.maskMediaFilename!}`)
  }, [shiftGetResponse])

  useEffect(() => {
    if(!saving || Object.keys(shiftChanges).length === 0) return;

    const requestBody: IndividualShiftPatchRequest = {
      data: shiftChanges
    }

    const urlParams: PatchIndivdualShiftRequest = {
      uuid: uuid,
      body: requestBody
    }

    fetchPatchIndividualShift(urlParams)
  }, [saving])

  useEffect(() => {
    if (!shiftPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: shiftPatchResponse.msg!}))
  }, [shiftPatchResponse])

  useEffect(() => {
    if (!shiftDeleteResponse) return;

    setElevatedState((prev) => ({...prev, msg: shiftDeleteResponse.msg!}))
  }, [shiftDeleteResponse])


  function deleteShift(){
    const confirmation = window.confirm("Are you sure you would like to delete your shift?")
    if(!confirmation) return;

    const urlParams: DeleteIndivdualShiftRequest = {
      uuid: uuid
    }

    fetchDeleteIndividualShift(urlParams)
    history.push("/")
  }


  return (
    <Container>
      <Row>
        <Col xs={9} className="p-2">
          <Row className="mb-3">
            <Col xs={1}></Col>
            <Col xs={5}>
              {shiftGetResponse ? 
                <ShiftTitleComponent owner={shiftGetResponse.owner} shift={shiftGetResponse.shift}
                  editing={editing} setShiftChanges={setShiftChanges}/>
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
            <Col xs={5} className="pr-2">
              <Media className="neumorphic borderRadius-3 p-2" srcString={baseMediaURL}
                setElevatedState={setElevatedState}/>
            </Col>
            <Col xs={5} className="pl-2">
              <Media className="neumorphic borderRadius-3 p-2" srcString={maskMediaURL}
                setElevatedState={setElevatedState}/>
            </Col>
            <Col xs={1}></Col>
          </Row>
          <Row className="mt-3 mx-2 px-2">
            <Col>
              <Button className="p-2 borderRadius-2 w-100">
                Share
              </Button>
            </Col>
            <Col>
              <a href={shiftMediaURL} download>
                <Button className="p-2 borderRadius-2 w-100">
                  Download
                </Button>
              </a>
            </Col>
            <Col>
              <Button className="p-2 borderRadius-2 w-100" onClick={() => {
                setElevatedState(prev => ({...prev, prebuiltShiftModel: uuid}))
                history.push("/load")
              }}>
                Shift &#10140;
              </Button>
            </Col>
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