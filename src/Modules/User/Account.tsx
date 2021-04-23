/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useState, useEffect } from 'react';

//First Party Imports
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { User } from '../../Interfaces/User';
import { Shift } from '../../Interfaces/Shift';


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

  const requestOptions: RequestInit = {
    method: 'GET',
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

    console.log(profileResponse)
    setUsername(profileResponse!.profile!.username!);
  }, [profileResponse]);

  useEffect(() => {
    if(!userShiftsResponse) return;

    console.log(userShiftsResponse)
  }, [userShiftsResponse]);


  return (
    <>
      <h2>{username}</h2>
      <p>Your Profile page.</p>
    </>
  );
}