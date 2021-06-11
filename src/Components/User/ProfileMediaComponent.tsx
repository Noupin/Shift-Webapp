/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';

//First Party Imports
import { Media } from '../../Components/Media/Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface IUserButtons{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  profilePictureURL: string
  editing: boolean
}


export const ProfileMediaComponent: FC<IUserButtons> = ({setElevatedState, profilePictureURL, editing}): ReactElement => {
  let profileMediaComponent = (
    <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL}
      setElevatedState={setElevatedState}/>
  )

  if (editing){
    profileMediaComponent = (
      <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL}
        setElevatedState={setElevatedState}/>
    )
  }

  return profileMediaComponent
}