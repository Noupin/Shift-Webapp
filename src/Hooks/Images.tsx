//Third Party Imports
import React, { useState } from 'react';


export function useBinaryImageCovnersion(): [(imageString: string) => Promise<void>, File, any, boolean]{
  const [response, setResponse] = useState(new File([], ''));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function call(imageString: string){
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

  return [call, response, error, isLoading]
}
