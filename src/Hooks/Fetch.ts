import { IElevatedPageState } from "../Interfaces/PageState";


export function useFetch<T>(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                            setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
                            setData: React.Dispatch<React.SetStateAction<T>>,
                            url: string, requestOptions: () => RequestInit,
                            defaultResponse: T): (responseType?: string) => Promise<void>{

  async function call(responseType='json'){
    setLoading(true);

    try{
      var response = await fetch(url, requestOptions());
      var convertedResponse = null;

      if(responseType === 'json'){
        convertedResponse = await response.json();
      }
      else if(responseType === 'blob'){
        convertedResponse = await response.blob();
      }
      else{
        convertedResponse = response;
      }

      if(convertedResponse == null){
        throw "Fetch Response is Null";
      }

      setData(convertedResponse!);
      setLoading(false);
    }
    catch (error){
      setLoading(false);
      setElevatedState((prev) => ({...prev, error}));
    }
  }

  return call
}
