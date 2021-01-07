//Third Party Imports
import React, { useState } from 'react';

//First Party Imports
import { useFetch } from './Fetch';


interface authenticationRequestReturn {
  authenticated: boolean
}

let authenticationResponse: authenticationRequestReturn = {authenticated: false};


export function useAuthentication(): [boolean, () => void, boolean]{
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(authenticationResponse);
  const [authenticated, setAuthenticated] = useState(false);

  function isAuthenticated(){
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' }
    };

    apiFetch(`/api/users/isAuthenticated`, requestOptions)
    setAuthenticated(apiResponse.authenticated)
  }

  return [authenticated, isAuthenticated, apiLoading]
}