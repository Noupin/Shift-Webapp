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

  const [, setFetchingImage] = useState(false);
  const [imageResponse, setImageResponse] = useState<Blob>();
  const [profilePicture, setProfilePicture] = useState<File>();
  const [filename, setFilename] = useState("");
  

  let requestOptions: RequestInit = {method: 'GET',
                                     credentials: "include",
                                     headers: { 'Content-Type': 'application/json' }
                                    };


  const fetchProfile = useFetch(setFetchingProfile, setElevatedState, setProfileResponse, `/api/users/profile`, () => requestOptions, profileResponse);
  const fetchUserShifts = useFetch(setFetchingUserShifts, setElevatedState, setUserShiftsResponse, `/api/users/shifts`, () => requestOptions, userShiftsResponse);
  const getMedia = useFetch(setFetchingImage, setElevatedState, setImageResponse, `/api/content/image/${filename}`, () => requestOptions, imageResponse);

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

    setFilename(profileResponse!.profile.imageFile.split('.')[0]);
    setUsername(profileResponse!.profile.username);

    getMedia("blob");
  }, [profileResponse, filename]);

  useEffect(() => {
    if(!imageResponse) return;

    setProfilePicture(new File([imageResponse], profileResponse!.profile.imageFile, {type: 'media'}))
    console.log(profilePicture)
  }, [imageResponse])

  useEffect(() => {
    if(!userShiftsResponse) return;

    //console.log(userShiftsResponse)
  }, [userShiftsResponse]);


  return (
    <Container key={profilePicture ? profilePicture.lastModified : undefined}>
      <h2>{username}</h2>
      <p>Your Profile page.</p>
      <Media className="neumorphic borderRadius-2 p-2" mediaSrc={profilePicture!} setElevatedState={setElevatedState}/>
    </Container>
  );
}