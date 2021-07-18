/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

//First Party Imports
import { Media } from '../../Components/Media/Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../../Swagger';


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
          {shift!.author.username}
          {shift!.author.verified! ? <FontAwesomeIcon icon={faShieldAlt}/> : <></>}
          {shift!.author.admin! ? <FontAwesomeIcon icon={faCheckCircle}/> : <></>}
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