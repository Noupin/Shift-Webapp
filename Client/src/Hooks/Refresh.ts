//First Party Imports
import { API_CONFIG } from "../constants";
import { IElevatedStateProps } from "../Interfaces/ElevatedStateProps";
import { refreshHookFactory, RefreshResponse } from '@noupin/feryv-oauth-hooks';


export interface IRefreshRefs{
  setter?: IElevatedStateProps["setElevatedState"]
}

const refs: IRefreshRefs = {}

export function makeRefresh(initialRefs: IRefreshRefs){
  if(initialRefs.setter){
    refs.setter = initialRefs.setter!
  }
  const setElevatedState = refs.setter!


  function successCallback(response: RefreshResponse){
    setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
  }
  function errorCallback(error: Error){
    setElevatedState(prev => ({...prev, accessToken: "", authenticated: false}))
  }

  return refreshHookFactory({onSuccess: successCallback, onError: errorCallback}, API_CONFIG)
}


export const useRefresh = () => makeRefresh(refs)
