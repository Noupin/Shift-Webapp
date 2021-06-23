/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';

//First Party Imports
import { Media } from '../Media/Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { FileDialog } from '../FileDialog/FileDialog';
import { validateFileList } from '../../Helpers/Files';
import { imageTypes } from '../../constants';
import './UserComponent.scss';


interface IUserButtons{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  profilePictureURL: string
  editing: boolean
  setProfilePicture: React.Dispatch<React.SetStateAction<File | undefined>>
  setProfilePictureURL: React.Dispatch<React.SetStateAction<string>>
}


export const ProfileMediaComponent: FC<IUserButtons> = ({setElevatedState, profilePictureURL, editing, setProfilePicture, setProfilePictureURL}): ReactElement => {
  let profileMediaComponent = (
    <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL}
      setElevatedState={setElevatedState}/>
  )

  if (editing){
    profileMediaComponent = (
      <div className="hoverInput" style={{position: "relative"}}>
        <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL}
          setElevatedState={setElevatedState}/>
        <div id="hoverFileDialogButton" style={{maxHeight: "70%", maxWidth: "70%"}}
          className="justify-content-center">
          <FileDialog className="justify-content-center align-items-center glassmorphic
          borderRadius-2 neumorphic neuHover" id="userProfileMedia" style={{display: "flex"}}
          onFileInput={(event) => {
            const [filteredFiles, badExtensions] = validateFileList(event.target.files!, imageTypes)

            if(badExtensions.length > 0){
              setElevatedState((prev) => ({...prev,
                msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
            }
            if(filteredFiles.length === 0){
              setProfilePicture(undefined)
            }
            else{
              setProfilePicture(filteredFiles[0])
              setProfilePictureURL(URL.createObjectURL(filteredFiles[0]))
            }
          }}>
            &#x21c6;
          </FileDialog>
        </div>
      </div>
    )
  }

  return profileMediaComponent
}