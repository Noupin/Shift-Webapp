
async function returnFetch(url: string, options: RequestInit){
  return await fetch(url, options)
}

export function useFetch<T>(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                            setError: React.Dispatch<React.SetStateAction<Error>>,
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
      setError(error);
    }
  }

  return call
}
