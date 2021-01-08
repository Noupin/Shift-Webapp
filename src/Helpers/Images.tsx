//Third Party Imports
import React, { useEffect } from 'react';


async function returnFetch(url: string, options: RequestInit){
  return await fetch(url, options)
}

export function useConvertImage(getLoading: () => boolean,
                             setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                             setError: React.Dispatch<React.SetStateAction<Error>>,
                             setData: React.Dispatch<React.SetStateAction<File>>,
                             imageString: () => string){
  useEffect(() => {
    async function call() {
      if(!getLoading()) return;

      try{
        const response = await fetch(imageString());
        const blob = await response.blob();
        setData(new File([blob], `image${imageString().substring(23, 33)}`));

        setLoading(false);
      }
      catch(error){
        setError(error);
      }
    }

    call()
  }, [getLoading()]);
}

