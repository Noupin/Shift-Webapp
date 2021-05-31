/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Masonry from 'react-masonry-css';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Media } from '../../Components/Media/Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { IndividualUserGetResponse } from '../../Swagger/models/IndividualUserGetResponse';
import { GetIndivdualUserRequest, UserShiftsRequest, Shift, UserShiftsResponse } from '../../Swagger';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';


export function UserPage (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const { username } = useParams<GetIndivdualUserRequest>();

  const [profileResponse, setProfileResponse] = useState<IndividualUserGetResponse>();
  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [userShifts, setUserShifts] = useState<Shift[]>([]);
  
  
  useEffect(() => {
    const urlParams: GetIndivdualUserRequest = {
      username: username
    }

    UserAPIInstance.getIndivdualUser(urlParams).then((value) => {
      setProfileResponse(value!)
    })
  }, []);

  useEffect(() => {
    const urlParams: UserShiftsRequest = {
      username: username
    }

    UserAPIInstance.userShifts(urlParams).then((value) => {
      setUserShiftsResponse(value!)
    })
  }, []);

  useEffect(() => {
    if(!profileResponse || !profileResponse.user) return;

    setProfilePictureURL(`/api/content/image/${profileResponse!.user.mediaFilename}`);
  }, [profileResponse]);

  useEffect(() => {
    if(!userShiftsResponse || !userShiftsResponse.shifts) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);


  return (
    <Container key={profilePictureURL}>
      <Row>
        <Col xs={3}>
          <Row className="justify-content-center">
            <h2>{username}</h2>
          </Row>
          <Row>
            <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL} setElevatedState={setElevatedState}/>
          </Row>
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