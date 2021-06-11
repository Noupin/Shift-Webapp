/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';

//First Party Imports
import { IndividualShiftGetResponse, IndividualShiftPatchRequest } from '../../Swagger';
import { TextBox } from '../TextBox/TextBox';
import { Image } from '../Image/Image';
import Verified from "../../Assets/verified_checkmark.svg";


interface IShiftTitle extends IndividualShiftGetResponse{
  editing: boolean
  shiftChanges: IndividualShiftPatchRequest["data"]
  setShiftChanges: React.Dispatch<React.SetStateAction<IndividualShiftPatchRequest["data"]>>
}


export const ShiftTitleComponent: FC<IShiftTitle> = ({editing, shiftChanges, setShiftChanges, shift}): ReactElement => {
  let shiftTitleComponent = (
    <h1 className="text-left">
      {shiftChanges.title!} {shift!.verified ?
      <Image style={{height: "0.75em", width: "auto"}} 
          className="object-fit-contain"
          imageSrc={Verified} alt="Verified"/> : <></>}
    </h1>
  )

  if (editing){
    shiftTitleComponent = (
      <>
        <TextBox className="text-left borderRadius-2 p-2" type="text"
          defaultValue={shiftChanges.title!} placeholder="Title"
          onBlur={(event) => setShiftChanges(prev => ({...prev, title: event.target.value}))}/>
        {shift!.verified ?
          <Image style={{height: "0.75em", width: "auto"}} 
              className="object-fit-contain"
              imageSrc={Verified} alt="Verified"/> : <></>}
      </>
    )
  }

  return shiftTitleComponent
}