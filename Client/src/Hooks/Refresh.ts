//First Party Imports
import { AuthenticateAPIFactory } from "../Helpers/Api";
import { IElevatedPageState } from "../Interfaces/PageState";


export function useRefresh(setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>): () => Promise<void>{
  
  async function fetchRefresh(){
    if(setLoading) setLoading(true);

    try{
      console.log("Sending refresh token")
      const response = await AuthenticateAPIFactory("").refresh()

      setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
    }
    catch{
      setElevatedState(prev => ({...prev, accessToken: "", authenticated: false}))
    }

    if(setLoading) setLoading(false);
  }

  return fetchRefresh
}
