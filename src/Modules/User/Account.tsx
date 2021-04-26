/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';

//First Party Imports
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { User } from '../../Interfaces/User';
import { Shift } from '../../Interfaces/Shift';
import { Media } from '../../Components/Media/Media';
import { Container } from 'react-bootstrap';
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
  const fetchUserShifts = useFetch(setFetchingUserShifts, setElevatedState, setUserShiftsResponse, `/api/users/shifts`, () => requestOptions, userShiftsResponse);

  useEffect(() => {
    if(!fetchingProfile) return;

    fetchProfile()
  }, [fetchingProfile]);

  useEffect(() => {
    if(!fetchingUserShifts) return;

    fetchUserShifts()
  }, [fetchingUserShifts]);

  useEffect(() => {
    if(!profileResponse) return;

    setProfilePictureURL(`/api/content/image/${profileResponse!.profile.imageFile}`);
    setUsername(profileResponse!.profile.username);
  }, [profileResponse]);

  useEffect(() => {
    if(!userShiftsResponse) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);


  return (
    <Container key={profilePictureURL}>
      <h2>{username}</h2>
      <p>Your Profile page.</p>
      <Media className="neumorphic borderRadius-3 p-2" srcString={profilePictureURL} setElevatedState={setElevatedState}/>
      {userShifts!.map((element) => (
        <ShiftCard className="borderRadius-2 m-2 p-2" shift={element} onClick={() => console.log(element.title)} setElevatedState={setElevatedState}/>
      ))}
    </Container>
  );
}