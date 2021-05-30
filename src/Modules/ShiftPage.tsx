/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

//First Party Imports
import { ShiftAPIInstance } from '../Helpers/Api';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../Swagger/models/IndividualShiftGetResponse';
import { GetIndivdualShiftRequest, Shift } from '../Swagger';
import { Media } from '../Components/Media/Media';


export function ShiftPage (props: IElevatedStateProps){
  const {setElevatedState} = props;

  let { uuid } = useParams<GetIndivdualShiftRequest>();


  const [shiftResponse, setShiftResponse] = useState<IndividualShiftGetResponse>();
  const [shift, setShift] = useState<Shift>()
  const [shiftMediaURL, setShiftMediaURL] = useState("");
  
  
  useEffect(() => {
    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    ShiftAPIInstance.getIndivdualShift(urlParams).then((value) => {
      setShiftResponse(value!)
    })
  }, []);

  useEffect(() => {
    if (!shiftResponse) return;

    setShift(shiftResponse.shift)
    setShiftMediaURL(`/api/content/image/${shiftResponse.shift!.mediaFilename!}`)
  }, [shiftResponse])

  return (
    <Container>
      <h1>{shift ? shift!.title : ""}</h1>
      <Media className="neumorphic borderRadius-3 p-2" srcString={shiftMediaURL} setElevatedState={setElevatedState}/>
    </Container>
  );
}