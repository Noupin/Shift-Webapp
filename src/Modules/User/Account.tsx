//Third Party Imports
import React, { useState, useEffect } from 'react';

//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import { useFetch } from "../../Hooks/Fetch";


interface accountRequestReturn {
  username: string,
}

let accountResponse: accountRequestReturn = {username: ""}


export const Account = (props: IElevatedPageState) => {
  const [username, setUsername] = useState("");

  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(accountResponse);

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' }
  };

  async function getAccountData() {
    apiFetch(`/api/users/account`, requestOptions)
    setUsername(apiResponse.username)
  }

  useEffect(() => {
    async function accountAPI(){
      getAccountData()
    }

    accountAPI()
  }, []);

  return (
    <>
      <h2>{username}</h2>
      <p>Your account page.</p>
    </>
  );
}