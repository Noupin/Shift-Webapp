/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';

//First Party Imports
import { useFetch } from "../../Hooks/Fetch";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface accountRequestReturn {
  username: string,
}


export function Account (props: IElevatedStateProps){
  const {setElevatedState} = props;

  const [username, setUsername] = useState("");

  const [fetching, setFetching] = useState(true);
  const [accountResponse, setAccountResponse] = useState<accountRequestReturn>()

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  };


  const fetchAccount = useFetch(setFetching, setElevatedState, setAccountResponse, `/api/users/account`, () => requestOptions, accountResponse)

  useEffect(() => {
    if(!fetching) return;
    fetchAccount()
  }, [fetching]);

  useEffect(() => {
    if(!accountResponse) return;
    setUsername(accountResponse!.username);
  }, [accountResponse]);


  return (
    <>
      <h2>{username}</h2>
      <p>Your account page.</p>
    </>
  );
}