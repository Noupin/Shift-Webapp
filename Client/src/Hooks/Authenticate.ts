//First Party Imports
import { AuthenticateAPIInstance } from '../Helpers/Api';
import { IElevatedPageState } from '../Interfaces/PageState';


export function useAuthenticate(setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>){

  async function call(){
    setLoading(true);

    try{
      AuthenticateAPIInstance.authenticated().then((value) => {
        if (value.user){
          setElevatedState((prev) => ({
            ...prev,
            authenticated: value.authenticated!,
            user: value.user!
          }));
        }
        else{
          setElevatedState((prev) => ({
            ...prev,
            authenticated: value.authenticated!
          }));
        }
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
