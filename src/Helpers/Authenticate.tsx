//Third Party Imports
import React, { useEffect } from 'react';

//First Party Imports
import { IAuthRequestReturn } from '../Interfaces/Authenticate'


const authRequestOptions: RequestInit = {
  method: 'GET',
  credentials: "include",
  headers: { 'Content-Type': 'application/json' }
};

async function returnFetch(url: string, options: RequestInit){
  return await fetch(url, options)
}

export function useAuthenticate(getLoading: () => boolean,
                             setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                             setError: React.Dispatch<React.SetStateAction<Error>>,
                             setData: React.Dispatch<React.SetStateAction<IAuthRequestReturn | undefined>>){
  useEffect(() => {
    async function call() {
      if(!getLoading()) return;

      try{
        const response = await returnFetch(`/api/users/isAuthenticated`, authRequestOptions);
        const json = await response.json();
        setData(json);

        setLoading(false);
      }
      catch (error){
        setError(error)
      }
    }

    call()
  }, [getLoading()]);
}
