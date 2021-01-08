import { IElevatedPageState } from "../Interfaces/PageState";

async function returnFetch(url: string, options: RequestInit){
  return await fetch(url, options)
}

export function useFetch<T>(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                            setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
                            setData: React.Dispatch<React.SetStateAction<T>>,
                            url: string, requestOptions: () => RequestInit,
                            defaultResponse: T): () => Promise<void>{

  async function call(){
    setLoading(true);

    try{
      const response = await fetch(url, requestOptions());
      const json = await response.json();

      setData(json);
      setLoading(false);
    }
    catch (error){
      setLoading(false);
      setElevatedState((prev) => ({...prev, error}));
    }
  }

  return call
}
