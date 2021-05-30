/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-css';

//First Party Imports
import { UserAPIInstance } from '../../Helpers/Api';
import { Media } from '../../Components/Media/Media';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { Shift, ProfileResponse, UserShiftsResponse } from '../../Swagger';


export function Account (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [username, setUsername] = useState("");

  const [profileResponse, setProfileResponse] = useState<ProfileResponse>();
  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();

  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [userShifts, setUserShifts] = useState<Shift[]>([]);
  
  
  useEffect(() => {
    UserAPIInstance.profile().then((value) => {
      setProfileResponse(value!)
    })
  }, []);

  useEffect(() => {
    UserAPIInstance.shifts().then((value) => {
      setUserShiftsResponse(value!)
    })
  }, []);

  useEffect(() => {
    if(!profileResponse || !profileResponse.profile) return;

    setProfilePictureURL(`/api/content/image/${profileResponse!.profile.mediaFilename}`);
    setUsername(profileResponse!.profile.username);
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
              <ShiftCard key={index} className="borderRadius-2 m-2 p-2" shift={element} setElevatedState={setElevatedState}/>
            ))}
          </Masonry>
        </Col>
      </Row>
    </Container>
  );
}