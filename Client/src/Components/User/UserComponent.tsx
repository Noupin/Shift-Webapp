/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Image } from '../../Components/Image/Image';
import Verified from "../../Assets/verified_checkmark.svg";
import Admin from "../../Assets/admin.svg";
import { TextBox } from '../../Components/TextBox/TextBox';
import { GetIndivdualUserRequest, IndividualUserPatchRequest, IndividualUserPatchResponse,
  PatchIndivdualUserRequest, UpdatePictureResponse, IndividualUserGetResponse,
  UpdatePictureRequest, DeleteIndivdualUserRequest, IndividualShiftDeleteResponse} from '../../Swagger';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { UserButtonComponent } from './UserButtonsComponent';
import { ProfileMediaComponent } from './ProfileMediaComponent';
import { useAuthenticate } from '../../Hooks/Authenticate';


interface IUserComponent{
  elevatedState: IElevatedStateProps["elevatedState"]
  setElevatedState: IElevatedStateProps["setElevatedState"]
  username: string
}


export const UserComponent: FC<IUserComponent> = ({elevatedState, setElevatedState, username}): ReactElement => {
  const history = useHistory()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [userChanges, setUserChanges] = useState<IndividualUserPatchRequest["data"]>({})

  const [userGetResponse, setUserGetResponse] = useState<IndividualUserGetResponse>();
  const [userPatchResponse, setUserPatchResponse] = useState<IndividualUserPatchResponse>();
  const [userDeleteResponse, setUserDeleteResponse] = useState<IndividualShiftDeleteResponse>();
  const [updatePictureResponse, setUpdatePictureResponse] = useState<UpdatePictureResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [profilePicture, setProfilePicture] = useState<File>();

  const [, setFetching] = useState(false)
  const auth = useAuthenticate(setFetching, setElevatedState)


  useEffect(() => {
    if(editing) return

    const urlParams: GetIndivdualUserRequest = {
      username: username
    }

    UserAPIInstance.getIndivdualUser(urlParams).then((value) => {
      setUserGetResponse(value!)
    })
  }, [username, userPatchResponse, editing, updatePictureResponse]);

  useEffect(() => {
    if (!deleting) return;

    async function deleteUser(){
      const urlParams: DeleteIndivdualUserRequest = {
        username: username
      }
  
      UserAPIInstance.deleteIndivdualUser(urlParams).then((value) => {
        setUserDeleteResponse(value!)
      })

      auth()
    }

    deleteUser()
  }, [deleting])

  useEffect(() => {
    if(!userGetResponse || !userGetResponse.user) return;

    setProfilePictureURL(`/api/content/image/${userGetResponse!.user.mediaFilename}`);
  }, [userGetResponse]);

  useEffect(() => {
    if(!saving) return;

    async function patchUser(){
      if(Object.keys(userChanges).length === 0) return

      const requestBody: IndividualUserPatchRequest = {
        data: userChanges
      }

      const urlParams: PatchIndivdualUserRequest = {
        username: username,
        body: requestBody
      }
  
      await UserAPIInstance.patchIndivdualUser(urlParams).then((value) => {
        setUserPatchResponse(value!)
      })
    }

    async function changeProfilePicture(){
      if(!profilePicture) return;

      const requestParams: UpdatePictureRequest = {
        requestFile: profilePicture
      }

      await UserAPIInstance.updatePicture(requestParams).then((value) => {
        setUpdatePictureResponse(value)
      })
    }

    patchUser()
    changeProfilePicture()
    setSaving(false)
    setProfilePicture(undefined)
  }, [saving])

  useEffect(() => {
    if (!userPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: userPatchResponse.msg!}))

    if(userChanges.username! && userChanges.username! !== username){
      history.push(`/user/${userChanges.username!}`)
    }
  }, [userPatchResponse])

  useEffect(() => {
    if (!userDeleteResponse) return;

    setElevatedState((prev) => ({...prev, msg: userDeleteResponse.msg!}))
  }, [userDeleteResponse])

  useEffect(() => {
    if (!updatePictureResponse) return;

    setElevatedState((prev) => ({...prev, msg: updatePictureResponse.msg!}))
  }, [updatePictureResponse])


  let userComponent = <></>

  if(userGetResponse && userGetResponse.user!){
    userComponent = (
      <>
        <Row>
          <h2>
            {username} {userGetResponse.user!.verified! ?
            <Image style={{height: "0.65em", width: "auto"}} 
                className="object-fit-contain"
                imageSrc={Admin} alt="Admin"/> : <></>} {userGetResponse.user!.admin! ?
            <Image style={{height: "0.65em", width: "auto"}} 
                className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
          </h2>
        </Row>
        <Row>
          <p>{userGetResponse.user!.email}</p>
        </Row>
        <Row>
          <ProfileMediaComponent setElevatedState={setElevatedState} setProfilePictureURL={setProfilePictureURL}
            setProfilePicture={setProfilePicture} profilePictureURL={profilePictureURL} editing={editing}/>
        </Row>
        {username === elevatedState().user.username && 
        <UserButtonComponent editing={editing} setEditing={setEditing} setSaving={setSaving} setDeleting={setDeleting}/>}
      </>
    )

    if(editing){
      userComponent = (
        <>
          <Row>
            <Col xs={12}>
              <TextBox className="text-left borderRadius-2 p-2 m-1 w-100" placeholder="Username"
                type="text" defaultValue={username}
                onBlur={(event) => {
                  if(event.target.value !== userGetResponse.user!.username){
                    setUserChanges(prev => ({...prev, username: event.target.value}))
                  }
                }}/>
              <div className="pr-2" style={{position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)"}}>
                {userGetResponse.user!.verified! ?
                <Image className="object-fit-contain" imageSrc={Admin} alt="Admin"/> : <></>}
                {userGetResponse.user!.admin! ?
                <Image className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextBox className="text-left borderRadius-2 p-2 m-1 w-100" placeholder="Email"
                type="text" defaultValue={userGetResponse.user!.email}
                onBlur={(event) => {
                  if(event.target.value !== userGetResponse.user!.email){
                    setUserChanges(prev => ({...prev, email: event.target.value}))
                  }
                }}/>
            </Col>
          </Row>
          <Row className="mt-2">
            <ProfileMediaComponent setElevatedState={setElevatedState} setProfilePictureURL={setProfilePictureURL}
              setProfilePicture={setProfilePicture} profilePictureURL={profilePictureURL} editing={editing}/>
          </Row>
          <UserButtonComponent editing={editing} setEditing={setEditing} setSaving={setSaving} setDeleting={setDeleting}/>
        </>
      )
    }
  }

  return userComponent
}
