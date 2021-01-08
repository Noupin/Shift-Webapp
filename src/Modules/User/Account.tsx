//Third Party Imports
import React, { useState, useEffect } from 'react';

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { useFetch } from "../../Helpers/Fetch";


interface accountRequestReturn {
  username: string,
}


export const Account = (props: IElevatedPageState) => {
  const [username, setUsername] = useState("");

  const [accountResponse, setAccountResponse] = useState<accountRequestReturn>()
  const [fetching, setFetching] = useState(false)

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  };


  useFetch(() => fetching, setFetching, props.setError, setAccountResponse, `/api/users/account`, () => requestOptions)

  useEffect(() => {
    if(fetching) return;
    setUsername(accountResponse!.username)
  }, [fetching]);


  return (
    <>
      <h2>{username}</h2>
      <p>Your account page.</p>
    </>
  );
}