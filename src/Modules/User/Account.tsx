/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-css';

//First Party Imports
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { User } from '../../Interfaces/User';
import { Shift } from '../../Interfaces/Shift';
import { Media } from '../../Components/Media/Media';
import { ShiftCard } from '../../Components/ShiftCard/ShiftCard';


interface profileRequestReturn {
  profile: User,
}

interface userShiftsRequestReturn {
  shifts: Shift[]
}


export function Account (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [username, setUsername] = useState("");

  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [profileResponse, setProfileResponse] = useState<profileRequestReturn>();

  const [fetchingUserShifts, setFetchingUserShifts] = useState(true);
  const [userShiftsResponse, setUserShiftsResponse] = useState<userShiftsRequestReturn>();

  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [userShifts, setUserShifts] = useState<Shift[]>([]);
  

  let requestOptions: RequestInit = {method: 'GET',
                                     credentials: "include",
                                     headers: { 'Content-Type': 'application/json' }
                                    };


  const fetchProfile = useFetch(setFetchingProfile, setElevatedState, setProfileResponse, `/api/users/profile`, () => requestOptions, profileResponse);
  const fetchUserShifts = useFetch(setFetchingUserShifts, setElevatedState, setUserShiftsResponse, `/api/users/userShifts`, () => requestOptions, userShiftsResponse);

  useEffect(() => {
    if(!fetchingProfile) return;

    fetchProfile()
  }, [fetchingProfile]);

  useEffect(() => {
    if(!fetchingUserShifts) return;

    fetchUserShifts()
  }, [fetchingUserShifts]);

  useEffect(() => {
    if(!profileResponse || !profileResponse.profile) return;

    setProfilePictureURL(`/api/content/image/${profileResponse!.profile.imagePath}`);
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
              <ShiftCard key={index} className="borderRadius-2 m-2 p-2" shift={element} onClick={() => console.log(element.uuid)} setElevatedState={setElevatedState}/>
            ))}
          </Masonry>
        </Col>
      </Row>
    </Container>
  );
}