/* eslint-disable react-hooks/exhaustive-deps */
//Third Party Imports
import { useEffect, useRef } from "react";
import { useHistory } from "react-router";

//First Party Imports
import { AuthenticateAPIFactory } from "../Helpers/Api";
import { IElevatedStateProps } from "../Interfaces/ElevatedStateProps";


export function useFetch<T, U, V>(thisArg: U,
  swaggerFunction: ((requestParameters: T) => Promise<V>) | (() => Promise<V>),
  elevatedState: IElevatedStateProps["elevatedState"], setElevatedState: IElevatedStateProps["setElevatedState"],
  setData: React.Dispatch<React.SetStateAction<V | undefined>> | ((requestParmaters: V, ...args: any[]) => void),
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>): (requestParams?: T, ...args: any[]) => Promise<void>{

  const history = useHistory()

  const reqAgain = useRef(false)
  const reqParams = useRef<T>()
  const argParams = useRef<any[]>()


  async function request(){
    const response = await swaggerFunction.call(thisArg, reqParams.current!)
    if(!argParams.current) setData(response);
    else setData(response, ...argParams.current);
  }


  async function requestAgain(){
    try{
      await request()
    }
    catch{
      setElevatedState((prev) => ({...prev,
        error: Error("Your login has expired please login again"),
        accessToken: ""
      }));
      history.push(`/login`)
    }
    if(setLoading) setLoading(false)
  }


  async function authenticate(){
    try{
      const response = await AuthenticateAPIFactory("").refresh()
      reqAgain.current = true
      setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
    }
    catch(error){
      setElevatedState(prev => ({...prev, accessToken: "", error: error}))
      history.push(`/login`)
    }
  }


  async function fetchCall(requestParams?: T, ...args: any[]){
    if(setLoading) setLoading(true);

    reqParams.current = requestParams
    argParams.current = args

    try{
      await request()
    }
    catch (error){
      if(error.status && error.status === 401){
        await authenticate()
      }
      else{
        setElevatedState((prev) => ({...prev, error: error, accessToken: ""}));
        history.push(`/error`)
      }
    }

    if(setLoading && !reqAgain.current){
      setLoading(false);
      reqAgain.current = false
    }
  }


  useEffect(() => {
    if(!reqAgain.current) return;

    async function req(){
      await requestAgain()
      reqAgain.current = false
      if(setLoading) setLoading(false)
    }

    req()
  }, [elevatedState().APIInstaces.apiKey])


  return fetchCall
}
