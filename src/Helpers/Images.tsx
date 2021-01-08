//Third Party Imports
import React, { useEffect } from 'react';


export function useConvertImage(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                setError: React.Dispatch<React.SetStateAction<Error>>,
                                setData: React.Dispatch<React.SetStateAction<File>>,
                                imageString: () => string){

  async function call(){
    setLoading(true);

    try{
      const sliceSize = 512
      const byteCharacters = atob(imageString());
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const file = new File(byteArrays, "image");

      setData(file);
      setLoading(false);
    }
    catch (error){
      setLoading(false);
      setError(error);
    }
  }

  return call
}

