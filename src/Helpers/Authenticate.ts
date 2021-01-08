//First Party Imports
import { IAuthRequestReturn } from '../Interfaces/Authenticate'
import { IElevatedPageState } from '../Interfaces/PageState';


const authRequestOptions: RequestInit = {
  method: 'GET',
  credentials: "include",
  headers: { 'Content-Type': 'application/json' }
};

async function returnFetch(url: string, options: RequestInit){
  return await fetch(url, options)
}

export function useAuthenticate(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
                                setData: React.Dispatch<React.SetStateAction<IAuthRequestReturn | undefined>>){

  async function call(){
    setLoading(true);

    try{
      const response = await fetch(`/api/users/isAuthenticated`, authRequestOptions);
      const json = await response.json();

      setData(json);
      setLoading(false);
    }
    catch (error){
      setLoading(false);
      setElevatedState((prev) => ({...prev, error: error}));
    }
  }

  return call
}