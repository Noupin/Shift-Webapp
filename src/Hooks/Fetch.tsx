//Third Party Imports
import React, { useState } from 'react';


export function useFetch(defaultResponse: any): [(url: string, options: RequestInit) => Promise<void>, typeof defaultResponse, any, boolean]{
  const [response, setResponse] = useState(defaultResponse);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function call(url: string, options: RequestInit){
    setIsLoading(true);

    try{
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
      setIsLoading(false)
    }
    catch (error){
      setIsLoading(false);
      setError(error);
    }
  }

  return [call, response, error, isLoading];
};