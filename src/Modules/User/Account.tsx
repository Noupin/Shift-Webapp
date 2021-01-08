//Third Party Imports
import React, { useState, useEffect } from 'react';

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { useFetch } from "../../Helpers/Fetch";


interface accountRequestReturn {
  username: string,
}


export function Account (props: {elevatedState: () => IElevatedPageState, setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>}){
  const {elevatedState, setElevatedState, ...navProps} = props;

  const [username, setUsername] = useState("");

  const [fetching, setFetching] = useState(true);
  const [accountResponse, setAccountResponse] = useState<accountRequestReturn>()

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  };


  const apiFetch = useFetch(setFetching, setElevatedState, setAccountResponse, `/api/users/account`, () => requestOptions, accountResponse)

  useEffect(() => {
    if(!fetching) return;
    apiFetch()
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