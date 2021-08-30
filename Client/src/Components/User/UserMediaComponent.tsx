/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';

//First Party Imports
import { Media } from "@noupin/feryv-components";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import './UserComponent.scss';


interface IUserMedia{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  profilePictureURL: string
}


export const ProfileMediaComponent: FC<IUserMedia> = ({setElevatedState, profilePictureURL}): ReactElement => {
  let profileMediaComponent = (
    <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL}
      errorCallback={(err) => setElevatedState(prev => ({...prev, msg: err}))}/>
  )

  return profileMediaComponent
}