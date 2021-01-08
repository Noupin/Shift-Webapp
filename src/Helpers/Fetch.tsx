//Third Party Imports
import React, { useEffect } from 'react';


async function returnFetch(url: string, options: RequestInit){
  return await fetch(url, options)
}

export function useFetch<T>(getLoading: () => boolean,
                             setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                             setError: React.Dispatch<React.SetStateAction<Error>>,
                             setData: React.Dispatch<React.SetStateAction<T>>,
                             url: string, requestOptions: () => RequestInit){
  useEffect(() => {
    async function call() {
      if(!getLoading()) return;

      try{
        const response = await returnFetch(url, requestOptions());
        const json = await response.json();
        console.log(json)
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
