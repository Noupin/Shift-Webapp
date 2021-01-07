//Third Party Imports
import React, { useState } from 'react';

//First Party Imports
import { useFetch } from './Fetch';


interface authenticationRequestReturn {
  authenticated: boolean
}

let authenticationResponse: authenticationRequestReturn = {authenticated: false};


export function useAuthentication(): [boolean, () => Promise<void>]{
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(authenticationResponse);
  const [authenticated, setAuthenticated] = useState(false);

  async function isAuthenticated(){
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' }
    };

    apiFetch(`/api/users/isAuthenticated`, requestOptions)
    console.log(apiResponse)
    setAuthenticated(apiResponse.authenticated)
  }

  return [authenticated, isAuthenticated]
}