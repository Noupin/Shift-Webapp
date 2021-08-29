/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

//First Party Imports
import { Media } from '@noupin/feryv-components';
import { getCDNPrefix } from '@noupin/feryv-cdn-helpers'
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualShiftGetResponse } from '../../Swagger';


interface IShiftUser extends IndividualShiftGetResponse{
  setElevatedState: IElevatedStateProps["setElevatedState"]
}


export const ShiftUserComponent: FC<IShiftUser> = ({shift, setElevatedState}): ReactElement => {
  const history = useHistory()

  return (
    <div onClick={() => history.push(`/user/${shift!.author.feryvUser!.username}`)}
      style={{cursor: "pointer"}}>
      <Row>
        <h4>
          {shift!.author.feryvUser!.username}
          {shift!.author.verified! ? <FontAwesomeIcon icon={faShieldAlt}/> : <></>}
          {shift!.author.admin! ? <FontAwesomeIcon icon={faCheckCircle}/> : <></>}
        </h4>
      </Row>
      <Row>
        <Media className="neumorphic borderRadius-3 p-2"
          srcString={`${getCDNPrefix(shift!.author.feryvUser!.mediaFilename!)}${shift!.author.feryvUser!.mediaFilename!}`}
          errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
      </Row>
    </div>
  )
}