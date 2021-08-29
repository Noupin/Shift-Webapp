/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

//First Party Imports
import { TextBox } from '@noupin/feryv-components';
import { getCDNPrefix } from '@noupin/feryv-cdn-helpers';
import { GetIndivdualUserRequest, IndividualUserPatchRequest, IndividualUserPatchResponse,
  PatchIndivdualUserRequest, IndividualUserGetResponse, DeleteIndivdualUserRequest,
  IndividualUserDeleteResponse } from '../../Swagger';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { UserButtonComponent } from './UserButtonsComponent';
import { ProfileMediaComponent } from './UserMediaComponent';
import { useFetch } from '../../Hooks/Fetch';
import { useRefresh } from '../../Hooks/Refresh';


interface IUserComponent extends IElevatedStateProps{
  setOwner: React.Dispatch<React.SetStateAction<boolean>>
  username: string
}


export const UserComponent: FC<IUserComponent> = ({elevatedState, setElevatedState,
  setOwner, username}): ReactElement => {
  const history = useHistory()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [userChanges, setUserChanges] = useState<IndividualUserPatchRequest["data"]>({})

  const [userGetResponse, setUserGetResponse] = useState<IndividualUserGetResponse>();
  const [userPatchResponse, setUserPatchResponse] = useState<IndividualUserPatchResponse>();
  const [userDeleteResponse, setUserDeleteResponse] = useState<IndividualUserDeleteResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [profilePicture, setProfilePicture] = useState<File>();

  const fetchGetUser = useFetch()({
    thisArg: elevatedState.APIInstances.User,
    swaggerFunction: elevatedState.APIInstances.User.getIndivdualUser,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setUserGetResponse
  })
  const fetchDeleteUser = useFetch()({
    thisArg: elevatedState.APIInstances.User,
    swaggerFunction: elevatedState.APIInstances.User.deleteIndivdualUser,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setUserDeleteResponse
  })
  const fetchPatchUser = useFetch()({
    thisArg: elevatedState.APIInstances.User,
    swaggerFunction: elevatedState.APIInstances.User.patchIndivdualUser,
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setUserPatchResponse
  })
  const fetchRefresh = useRefresh()()


  //Get user
  useEffect(() => {
    if(editing || saving) return;

    const urlParams: GetIndivdualUserRequest = {
      username: username
    }
    fetchGetUser(urlParams)
  }, [username, editing]);

  //Delete user and refresh access token
  useEffect(() => {
    if (!deleting) return;
    const confirmation = window.confirm("Are you sure you would like to delete your account?")
    if(!confirmation) return;

    const urlParams: DeleteIndivdualUserRequest = {
      username: username
    }

    fetchDeleteUser(urlParams)
    fetchRefresh()
    history.push("/")
  }, [deleting])

  //User get response
  useEffect(() => {
    if(!userGetResponse || !userGetResponse.user) return;

    setOwner(userGetResponse.owner)
    setProfilePictureURL(`${getCDNPrefix(userGetResponse!.user.feryvUser!.mediaFilename)}${userGetResponse!.user.feryvUser!.mediaFilename}`);
  }, [userGetResponse]);

  //Patch and Profile Picture update
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
      fetchPatchUser(urlParams)
      fetchRefresh()
    }


    patchUser()
    setSaving(false)
    setProfilePicture(undefined) //Try to remove
  }, [saving])

  //Patched user repsonse adn url forwarding
  useEffect(() => {
    if (!userPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: userPatchResponse.msg!}))

    if(userChanges.username! && userChanges.username! !== username){
      history.push(`/user/${userChanges.username!}`)
    }
  }, [userPatchResponse])

  //Deleted user response
  useEffect(() => {
    if (!userDeleteResponse) return;

    setElevatedState((prev) => ({...prev, msg: userDeleteResponse.msg!}))
  }, [userDeleteResponse])


  let userComponent = <></>

  if(userGetResponse && userGetResponse.user!){
    userComponent = (
      <>
        <Row>
          <h2>
            {username}
            {userGetResponse.user!.admin! ? <FontAwesomeIcon icon={faShieldAlt}/> : <></>}
            {userGetResponse.user!.verified! ? <FontAwesomeIcon icon={faCheckCircle}/> : <></>}
          </h2>
        </Row>
        <Row>
          <p>{userGetResponse.user!.feryvUser!.email}</p>
        </Row>
        <Row>
          <ProfileMediaComponent setElevatedState={setElevatedState} setProfilePictureURL={setProfilePictureURL}
            setProfilePicture={setProfilePicture} profilePictureURL={profilePictureURL} editing={editing}/>
        </Row>
        {userGetResponse && userGetResponse.owner && elevatedState.authenticated && 
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
                  if(event.target.value !== userGetResponse.user!.feryvUser!.username){
                    setUserChanges(prev => ({...prev, username: event.target.value}))
                  }
                }}/>
              <div className="pr-2" style={{position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)"}}>
                {userGetResponse.user!.admin! ? <FontAwesomeIcon icon={faShieldAlt}/> : <></>}
                {userGetResponse.user!.verified! ? <FontAwesomeIcon icon={faCheckCircle}/> : <></>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextBox className="text-left borderRadius-2 p-2 m-1 w-100" placeholder="Email"
                type="text" defaultValue={userGetResponse.user!.feryvUser!.email}
                onBlur={(event) => {
                  if(event.target.value !== userGetResponse.user!.feryvUser!.email){
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
