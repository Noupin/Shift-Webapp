/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import Masonry from 'react-masonry-css';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Image } from '../../Components/Image/Image';
import { Media } from '../../Components/Media/Media';
import { Button } from '../../Components/Button/Button';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualUserGetResponse } from '../../Swagger/models/IndividualUserGetResponse';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import Verified from "../../Assets/verified_checkmark.svg";
import Admin from "../../Assets/admin.svg";
import { pageTitles } from '../../constants';
import { TextBox } from '../../Components/TextBox/TextBox';
import { GetIndivdualUserRequest, UserShiftsRequest, Shift,
  UserShiftsResponse, IndividualUserPatchRequest, IndividualUserPatchResponse, PatchIndivdualUserRequest } from '../../Swagger';


export function UserPage (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const { username } = useParams<GetIndivdualUserRequest>();
  const history = useHistory()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [userChanges, setUserChanges] = useState<IndividualUserPatchRequest["data"]>({})

  const [userGetResponse, setUserGetResponse] = useState<IndividualUserGetResponse>();
  const [userPatchResponse, setUserPatchResponse] = useState<IndividualUserPatchResponse>();
  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [userShifts, setUserShifts] = useState<Shift[]>([]);


  useEffect(() => {
    document.title = pageTitles["user"](username)
  }, [])
  
  useEffect(() => {
    const urlParams: GetIndivdualUserRequest = {
      username: username
    }

    UserAPIInstance.getIndivdualUser(urlParams).then((value) => {
      setUserGetResponse(value!)
    })
  }, [username, userPatchResponse, editing]);

  useEffect(() => {
    const urlParams: UserShiftsRequest = {
      username: username
    }

    UserAPIInstance.userShifts(urlParams).then((value) => {
      setUserShiftsResponse(value!)
    })
  }, [username]);

  useEffect(() => {
    if(!userGetResponse || !userGetResponse.user) return;

    setProfilePictureURL(`/api/content/image/${userGetResponse!.user.mediaFilename}`);
  }, [userGetResponse]);

  useEffect(() => {
    if(!userShiftsResponse || !userShiftsResponse.shifts) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);

  useEffect(() => {
    if(!saving) return;

  
    async function patchUser(){
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

    patchUser()
    setSaving(false)
  }, [saving])

  useEffect(() => {
    if (!userPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: userPatchResponse.msg!}))

    if(userChanges.username! && userChanges.username! !== username){
      console.log(userChanges.username!)
      history.push(`/user/${userChanges.username!}`)
    }
  }, [userPatchResponse])


  let userComponent = <></>
  let updateUserComponent = <></>

  if(userGetResponse && userGetResponse.user!){
    if(userGetResponse.owner){
      if(editing){
        updateUserComponent = (
          <Row>
            <Col>
              <Button className="borderRadius-2 p-2 mt-2 w-100"
              onClick={() => {
                setEditing(false)
                setSaving(true)
              }}>
                Save
              </Button>
            </Col>
            <Col>
              <Button className="borderRadius-2 p-2 mt-2 w-100 text-danger"
              onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        )
      }
      else{
        updateUserComponent = (
          <Row>
            <Col>
              <Button className="borderRadius-2 p-2 mt-2 w-100" onClick={() => setEditing(true)}>
                Edit
              </Button>
            </Col>
            <Col>
              <Button className="borderRadius-2 p-2 mt-2 w-100 text-danger">
                Delete
              </Button>
            </Col>
          </Row>
        )
      }
    }

    userComponent = (
      <>
        <Row>
          <h2>
            {username} {userGetResponse.user!.verified! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain"
                imageSrc={Admin} alt="Admin"/> : <></>} {userGetResponse.user!.admin! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
          </h2>
        </Row>
        <Row>
          <p>{userGetResponse.user!.email}</p>
        </Row>
        <Row>
          <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL} setElevatedState={setElevatedState}/>
        </Row>
        {updateUserComponent}
      </>
    )

    if(editing){
      userComponent = (
        <>
          <Row>
            <Col xs={8}>
              <TextBox className="text-left borderRadius-2 p-2 m-1" placeholder="Username"
                type="text" defaultValue={username}
                onBlur={(event) => {
                  if(event.target.value !== userGetResponse.user!.username){
                    setUserChanges(prev => ({...prev, username: event.target.value}))
                  }
                }}/>
            </Col>
            <Col xs={4}>
              {userGetResponse.user!.verified! ?
              <Image style={{height: "0.75em", width: "auto"}} 
                  className="object-fit-contain"
                  imageSrc={Admin} alt="Admin"/> : <></>}
              {userGetResponse.user!.admin! ?
              <Image style={{height: "0.75em", width: "auto"}} 
                  className="object-fit-contain"
                  imageSrc={Verified} alt="Verified"/> : <></>}
            </Col>
          </Row>
          <Row>
            <TextBox className="text-left borderRadius-2 py-1 px-2 m-1" placeholder="Email"
              type="text" defaultValue={userGetResponse.user!.email}
              onBlur={(event) => {
                if(event.target.value !== userGetResponse.user!.email){
                  setUserChanges(prev => ({...prev, email: event.target.value}))
                }
              }}/>
          </Row>
          <Row>
            <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL} setElevatedState={setElevatedState}/>
          </Row>
          {updateUserComponent}
        </>
      )
    }
  }


  return (
    <Container key={username}>
      <Row>
        <Col xs={3}>
          {userComponent}
        </Col>
        <Col xs={9} className="p-2">
          <Masonry breakpointCols={{default: 4,
                                    1400: 3,
                                    1100: 2,
                                    800: 1}}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
            {userShifts!.map((element, index) => (
              <ShiftCard key={index} className="m-2 p-2" shift={element} setElevatedState={setElevatedState}/>
            ))}
          </Masonry>
        </Col>
      </Row>
    </Container>
  );
}