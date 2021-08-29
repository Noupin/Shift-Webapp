/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { History } from 'history';

//First Party Imports
import { API_CONFIG } from "../constants";
import { IElevatedStateProps } from "../Interfaces/ElevatedStateProps";
import { RefreshResponse, logoutHookFactory } from '@noupin/feryv-oauth-hooks';


export interface IRefs{
  setter?: IElevatedStateProps["setElevatedState"]
  navigator?: History<unknown>
}

const refs: IRefs = {}

export function makeLogout(initialRefs: IRefs){
  if(initialRefs.setter){
    refs.setter = initialRefs.setter!
  }
  if(!initialRefs.navigator){
    refs.navigator = initialRefs.navigator!
  }
  const setElevatedState = refs.setter!


  function authSuccessCallback(response: RefreshResponse){
    setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
  }
  function errorCallback(error: Error){
    setElevatedState((prev) => ({...prev, error: error}));
  }
  function authErrorCallback(error: Error){
    setElevatedState(prev => ({...prev, accessToken: "", error: error}))
  }
  function authSecondErrorCallback(error: Error){
    setElevatedState((prev) => ({...prev,
      error: Error(`Either your login has expired or ${error.message}`),
      accessToken: ""
    }));
  }

  return logoutHookFactory({onAuthSuccess: authSuccessCallback, onError: errorCallback,
    onAuthError: authErrorCallback, onSecondAuthError: authSecondErrorCallback},
    API_CONFIG)
}


export const useLogout = () => makeLogout(refs)
