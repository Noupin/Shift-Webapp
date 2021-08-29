/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


//First Party Imports
import { Button } from '@noupin/feryv-components';
import { FERYV_OAUTH_URL, LogoutResponse } from "@noupin/feryv-oauth-hooks";
import { useLogout } from '../../Hooks/Logout';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { currentUser } from '../../Helpers/User';
import './Navbar.scss'


export function UserElements (props: IElevatedStateProps){
  const { elevatedState, setElevatedState } = props;

  const [logoutResponse, setLogoutResponse] = useState<LogoutResponse>();
  const [fetching, setFetching] = useState(false);
  const fetchLogout = useLogout()({
    authDependency: elevatedState.APIInstances.apiKey,
    setData: setLogoutResponse,
    setLoading: setFetching
  })


  useEffect(() => {
    if(!logoutResponse) return;

    setElevatedState(prev => ({...prev, msg: logoutResponse.msg!, accessToken: ""}))
  }, [logoutResponse])


  if(elevatedState.authenticated){
    return (
      <>
      <div className="mx-1 my-1">
        <NavLink to={`/user/${currentUser().feryvUser?.username}`} activeClassName="navSelected"
          className="nav-link borderRadius-2 px-3">
          Account
        </NavLink>
      </div>
      <div className="mx-1 my-1">
        <Button className="neumorphic borderRadius-2 py-2 px-3 w-100 nav-link"
          onClick={() => {fetchLogout(elevatedState.accessToken)}} disabled={fetching}>
            Logout
        </Button>
      </div>
      </>
    );
  }

  else{
    return (
      <>
      <div className="mx-1 my-1">
        <a href={`${FERYV_OAUTH_URL}/login/${encodeURIComponent(window.location.href)}`} className="nav-link borderRadius-2 px-3">
          Login
        </a>
      </div>
      <div className="mx-1 my-1">
        <a href={`${FERYV_OAUTH_URL}/register/${encodeURIComponent(window.location.href)}`} className="nav-link borderRadius-2 px-3">
          Register
        </a>
      </div>
      </>
    );
  }
}