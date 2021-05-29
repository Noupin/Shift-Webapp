//First Party Imports
import { AuthenticateAPIInstance } from '../Helpers/Api';
import { AuthenticatedResponse } from '../Swagger';
import { IElevatedPageState } from '../Interfaces/PageState';


export function useAuthenticate(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
                                setData: React.Dispatch<React.SetStateAction<AuthenticatedResponse | undefined>>){

  async function call(){
    setLoading(true);

    try{
      AuthenticateAPIInstance.authenticated().then((value) => {
        setData(value);
        setLoading(false);
      })
    }
    catch (error){
      setLoading(false);
      setElevatedState((prev) => ({...prev, error: error}));
    }
  }

  return call
}
