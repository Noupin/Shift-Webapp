import { IElevatedPageState } from "../Interfaces/PageState";

export function useConvertImage(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
                                setData: React.Dispatch<React.SetStateAction<File>> | React.Dispatch<React.SetStateAction<File | undefined>>,
                                imageString: () => string){

  function call(){
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
      setElevatedState((prev) => ({...prev, error: error}));
    }
  }

  return call
}

