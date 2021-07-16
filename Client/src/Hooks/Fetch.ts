//Third Party Imports
import { useHistory } from "react-router";

//First Party Imports
import { AuthenticateAPIFactory } from "../Helpers/Api";
import { IElevatedPageState } from "../Interfaces/PageState";


export function useFetch<T, U, V>(thisArg: U,
  swaggerFunction: ((requestParameters: T) => Promise<V>) | (() => Promise<V>),
  setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>,
  setData: React.Dispatch<React.SetStateAction<V | undefined>> | ((requestParmaters: V, ...args: any[]) => void),
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>): (requestParams?: T, ...args: any[]) => Promise<void>{

  const history = useHistory()
  
  async function fetchCall(requestParams?: T, ...args: any[]){
    if(setLoading) setLoading(true);

    async function request(){
      const response = await swaggerFunction.call(thisArg, requestParams!)
      if(!args) setData(response);
      else setData(response, ...args);
    }

    async function requestAgain(){
      try{
        console.log("Requesting again after refreshing")
        await request()
      }
      catch{
        setElevatedState((prev) => ({...prev,
          error: Error("Your login has expired please login again"),
          accessToken: ""
        }));
        history.push(`/login`)
      }
    }

    async function authenticate(){
      try{
        console.log("Sending refresh token")
        const response = await AuthenticateAPIFactory("").refresh()
        setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
        await requestAgain()
      }
      catch{
        setElevatedState(prev => ({...prev, accessToken: ""}))
        history.push(`/login`)
      }
    }

    try{
      await request()
    }
    catch (error){
      if(error.response && error.response.status === 401){
        await authenticate()
      }
      else{
        setElevatedState((prev) => ({...prev, error: error, accessToken: ""}));
        //history.push(`/error`)
      }
    }

    if(setLoading) setLoading(false);
  }

  return fetchCall
}
