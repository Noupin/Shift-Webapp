//Third Party Imports
import React, { useState, useEffect } from 'react';


export function useBinaryImageCovnersion(): [(newImageString: string) => void, File, any, boolean]{
  const [response, setResponse] = useState(new File([], ''));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageString, setImageString] = useState("")

  function call(newImageString: string){
    setImageString(newImageString)
    console.log(imageString)
  }


  useEffect(() => {
    if(!imageString) return;

    async function convertImage(){
      setIsLoading(true);
  
      try{
        const response = await fetch(imageString);
        const blob = await response.blob();
        setResponse(new File([blob], `image${imageString.substring(23, 33)}`));
        setIsLoading(false);
      }
      catch (error){
        setIsLoading(false);
        setError(error);
      }
    }

    convertImage()
    setImageString("")
  });

  return [call, response, error, isLoading]
}
