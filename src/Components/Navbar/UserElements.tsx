/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


//First Party Imports
import './Navbar.scss'
import { Button } from '../../Components/Button/Button';
import { useFetch } from "../../Hooks/Fetch";
import { useAuthenticate } from '../../Helpers/AuthenticateUser';
import { IAuthRequestReturn } from '../../Interfaces/Authenticate';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface logoutRequestReturn {
  msg: string
}


export function UserElements (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [authenticating, setAuthenticating] = useState(false);
  const [authenticatedResponse, setAuthenticatedResponse] = useState<IAuthRequestReturn>()

  const [fetching, setFetching] = useState(false);
  const [logoutResponse, setLogoutResponse] = useState<logoutRequestReturn>();

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'}
  };

  const auth = useAuthenticate(setAuthenticating, setElevatedState, setAuthenticatedResponse)
  const fetchLogout = useFetch(setFetching, setElevatedState, setLogoutResponse, `/api/users/logout`, () => requestOptions, logoutResponse)

  useEffect(() => {
    if(!fetching) return;
    fetchLogout()
    setAuthenticating(true)
  }, [fetching]);

  useEffect(() => {
    if (!authenticating || !logoutResponse) return;
    setElevatedState((prev) => ({...prev, msg: logoutResponse!.msg}))
    auth()
  }, [authenticating, logoutResponse]);

  useEffect(() => {
    if (!authenticatedResponse) return;
    setElevatedState((prev) => ({...prev, authenticated: authenticatedResponse!.authenticated}))
  }, [authenticatedResponse]);


  if(elevatedState().authenticated){
    return (
      <>
      <div className="mx-1 my-1">
        <NavLink to="/account" activeClassName="navSelected" className="nav-link borderRadius-2 px-3">
          Account
        </NavLink>
      </div>
      <div className="mx-1 my-1">
        <Button className="neumorphic borderRadius-2 py-2 px-3 w-100" onClick={() => setFetching(true)} disabled={fetching || authenticating}>
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
        <NavLink to="/login" activeClassName="navSelected" className="nav-link borderRadius-2 px-3">
          Login
        </NavLink>
      </div>
      <div className="mx-1 my-1">
        <NavLink to="/register" activeClassName="navSelected" className="nav-link borderRadius-2 px-3">
          Register
        </NavLink>
      </div>
      </>
    );
  }
}