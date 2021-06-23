/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

//First Party Imports
import { Media } from '../../Components/Media/Media';
import { Image } from '../../Components/Image/Image';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../../Swagger';
import Verified from "../../Assets/verified_checkmark.svg";
import Admin from "../../Assets/admin.svg";


interface IShiftUser extends IndividualShiftGetResponse{
  setElevatedState: IElevatedStateProps["setElevatedState"]
}


export const ShiftUserComponent: FC<IShiftUser> = ({shift, setElevatedState}): ReactElement => {
  const history = useHistory()

  return (
    <div onClick={() => history.push(`/user/${shift!.author.username}`)}
      style={{cursor: "pointer"}}>
      <Row>
        <h4>
          {shift!.author.username} {shift!.author.verified! ?
          <Image style={{height: "0.75em", width: "auto"}} 
              className="object-fit-contain"
              imageSrc={Admin} alt="Admin"/> : <></>} {shift!.author.admin! ?
          <Image style={{height: "0.75em", width: "auto"}} 
              className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
        </h4>
      </Row>
      <Row>
        <Media className="neumorphic borderRadius-3 p-2"
               srcString={`/api/content/image/${shift!.author.mediaFilename!}`}
               setElevatedState={setElevatedState}/>
      </Row>
    </div>
  )
}