/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

//First Party Imports
import { Button, Media, Image } from '@noupin/feryv-components';
import { getCDNPrefix } from '@noupin/feryv-cdn-helpers'
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../Swagger/models/IndividualShiftGetResponse';
import LeftCurvedArrow from "../Assets/LeftCurvedArrow.svg"
import RightCurvedArrow from "../Assets/RightCurvedArrow.svg"
import { pageTitles } from '../constants';
import { DeleteIndivdualShiftRequest, GetIndivdualShiftRequest, IndividualShiftDeleteResponse, IndividualShiftPatchRequest,
  IndividualShiftPatchResponse, PatchIndivdualShiftRequest } from '../Swagger';
import { ShiftButtonsComponent } from '../Components/Shift/ShiftButtonsComponent';
import { ShiftUserComponent } from '../Components/Shift/ShiftUserComponent';
import { ShiftTitleComponent } from '../Components/Shift/ShiftTitleComponent';
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


  const fetchGetIndividualShift = useFetch()({
    thisArg: elevatedState.APIInstances.Shift,
    swaggerFunction: elevatedState.APIInstances.Shift.getIndivdualShift,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setShiftGetResponse
  })
  const fetchPatchIndividualShift = useFetch()({
    thisArg: elevatedState.APIInstances.Shift,
    swaggerFunction: elevatedState.APIInstances.Shift.patchIndivdualShift,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setShiftPatchResponse,
    setLoading: setSaving
  })
  const fetchDeleteIndividualShift = useFetch()({
    thisArg: elevatedState.APIInstances.Shift,
    swaggerFunction: elevatedState.APIInstances.Shift.deleteIndivdualShift,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setShiftDeleteResponse
  })


  function shareClick(event: Event){
    if(!shiftGetResponse){
      setElevatedState(prev => ({...prev, msg: "There was no data to share please reload your page."}))
      return;
    }
    try{
      navigator.share({
        title: `Shift: ${shiftGetResponse.shift!.title} by ${shiftGetResponse.shift!.author.feryvUser!.username}`,
        text: `Look at the shift ${shiftGetResponse.shift!.author.feryvUser!.username} made. Make your own at https://shift.feryv.com`,
        url: `${window.location.href}`
      }).then(() => {
        setElevatedState(prev => ({...prev, msg: "Thanks you for sharing!"}))
      }).catch(error => {
        setElevatedState(prev => ({...prev, error: error}))
      })
    }
    catch(err){
      try{
        navigator.clipboard.writeText(window.location.href).then(function() {
          setElevatedState(prev => ({...prev, msg: "The link has been copied to your clipboard. Pressing Ctrl and V at the same time will paste it!"}))
        }, function() {
          setElevatedState(prev => ({...prev, error: Error("We couldnt copy the link to your clipboard or find a share menu. Please copy the URL to share.")}))
        });
      }
      catch{
        setElevatedState(prev => ({...prev, msg: "Sorry we couldn't share or copy the link for you please try copying the link yourself then you will be able to send it however you want."}))
      }
    }
    
  }

  useEffect(() => {
    document.title = pageTitles[""]
  }, [])

  useEffect(() => {
    if(editing || saving) return;

    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    fetchGetIndividualShift(urlParams)
  }, [uuid, shiftPatchResponse, editing, elevatedState.APIInstances.apiKey]);

  useEffect(() => {
    if (!shiftGetResponse) return;

    document.title = pageTitles["shift"](shiftGetResponse.shift!.author.feryvUser!.username, shiftGetResponse.shift!.title)

    setShiftMediaURL(`${getCDNPrefix(shiftGetResponse.shift!.mediaFilename!)}${shiftGetResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${getCDNPrefix(shiftGetResponse.shift!.baseMediaFilename!)}${shiftGetResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${getCDNPrefix(shiftGetResponse.shift!.maskMediaFilename!)}${shiftGetResponse.shift!.maskMediaFilename!}`)
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
            <Col xs={4} className="m-auto">
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
                errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={4}>
              <Image style={elevatedState.frontEndSettings.darkMode ? 
              {height: "5em", width: "auto", filter: "invert(100%)"} :
              {height: "5em", width: "auto"}} className="m-1"
                imageSrc={LeftCurvedArrow} alt="LeftArrow"/>
            </Col>
            <Col xs={4}>
              <Image style={elevatedState.frontEndSettings.darkMode ? 
              {height: "5em", width: "auto", filter: "invert(100%)"} :
              {height: "5em", width: "auto"}} className="m-1"
                imageSrc={RightCurvedArrow} alt="RightArrow"/>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={5} className="pr-2">
              <Media className="neumorphic borderRadius-3 p-2" srcString={baseMediaURL}
                errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
            </Col>
            <Col xs={5} className="pl-2">
              <Media className="neumorphic borderRadius-3 p-2" srcString={maskMediaURL}
                errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
            </Col>
            <Col xs={1}></Col>
          </Row>
          <Row className="mt-3 mx-2 px-2">
            <Col>
              <Button className="p-2 borderRadius-2 w-100" onClick={shareClick}>
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