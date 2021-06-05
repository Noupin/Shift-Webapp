/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Masonry from 'react-masonry-css';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Image } from '../../Components/Image/Image';
import { Media } from '../../Components/Media/Media';
import { Button } from '../../Components/Button/Button';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualUserGetResponse } from '../../Swagger/models/IndividualUserGetResponse';
import { GetIndivdualUserRequest, UserShiftsRequest, Shift, UserShiftsResponse } from '../../Swagger';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import Verified from "../../Assets/verified_checkmark.svg";
import Admin from "../../Assets/admin.svg";


export function UserPage (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const { username } = useParams<GetIndivdualUserRequest>();

  const [userResponse, setUserResponse] = useState<IndividualUserGetResponse>();
  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [userShifts, setUserShifts] = useState<Shift[]>([]);


  useEffect(() => {
    document.title = `Shift - ${username}`
  }, [])
  
  useEffect(() => {
    const urlParams: GetIndivdualUserRequest = {
      username: username
    }

    UserAPIInstance.getIndivdualUser(urlParams).then((value) => {
      setUserResponse(value!)
    })
  }, [username]);

  useEffect(() => {
    const urlParams: UserShiftsRequest = {
      username: username
    }

    UserAPIInstance.userShifts(urlParams).then((value) => {
      setUserShiftsResponse(value!)
    })
  }, [username]);

  useEffect(() => {
    if(!userResponse || !userResponse.user) return;

    setProfilePictureURL(`/api/content/image/${userResponse!.user.mediaFilename}`);
  }, [userResponse]);

  useEffect(() => {
    if(!userShiftsResponse || !userShiftsResponse.shifts) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);


  let userComponent = <></>
  let updateUserComponent = <></>
  if(userResponse){
    if(userResponse.owner){
      updateUserComponent = (
        <Row>
          <Button className="borderRadius-2 p-2 mt-2">Edit Profile</Button>
        </Row>
      )
    }
    userComponent = (
      <>
        <Row>
          <h2>
            {username} {userResponse.user!.verified! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain"
                imageSrc={Admin} alt="Admin"/> : <></>} {userResponse.user!.admin! ?
            <Image style={{height: "0.75em", width: "auto"}} 
                className="object-fit-contain" imageSrc={Verified} alt="Verified"/> : <></>}
          </h2>
        </Row>
        <Row>
          <p>{userResponse.user!.email}</p>
        </Row>
        <Row>
          <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL} setElevatedState={setElevatedState}/>
        </Row>
        {updateUserComponent}
      </>
    )
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