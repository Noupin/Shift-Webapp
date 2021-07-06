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
  setShiftChanges: React.Dispatch<React.SetStateAction<IndividualShiftPatchRequest["data"]>>
}


export const ShiftTitleComponent: FC<IShiftTitle> = ({editing, setShiftChanges, shift}): ReactElement => {
  let shiftTitleComponent = (
    <h1 className="text-left">
      {shift!.title} {shift!.verified ?
      <Image style={{height: "0.75em", width: "auto"}} 
          className="object-fit-contain"
          imageSrc={Verified} alt="Verified"/> : <></>}
    </h1>
  )

  if (editing){
    shiftTitleComponent = (
      <div style={{position: "relative"}}>
        <TextBox className="text-left borderRadius-2 p-2 w-100" type="text"
          defaultValue={shift!.title} placeholder="Title"
          onBlur={(event) => {
            if(event.target.value !== shift!.title){
              setShiftChanges(prev => ({...prev, title: event.target.value}))
            }
          }}/>
        <div className="pr-2" style={{position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)"}}>
          {shift!.verified ?
            <Image className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
        </div>
      </div>
    )
  }

  return shiftTitleComponent
}