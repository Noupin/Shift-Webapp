//Third Party Imports
import React, { useState, useEffect } from 'react';


const fetchRequest: RequestInit = {};


export function useFetch(defaultResponse: any): [(newURL: string, options: RequestInit) => void, any, any, boolean]{
  const [response, setResponse] = useState(defaultResponse);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setURL] = useState("")
  const [requestOptions, setRequestOptions] = useState(fetchRequest)


  function call(newURL: string, options: RequestInit){
    setURL(newURL)
    setRequestOptions(options)
  }


  useEffect(() => {
    if(!url) return;

    async function fetchData(){
      setIsLoading(true);

      try{
        const res = await fetch(url, requestOptions);
        const json = await res.json();
        console.log(json)
        setResponse(json);
        setIsLoading(false)
      }
      catch (error){
        setIsLoading(false);
        setError(error);
      }
    }

    fetchData();

    setURL("");
    setRequestOptions(fetchRequest);
  }, [url]);

  return [call, response, error, isLoading];
};