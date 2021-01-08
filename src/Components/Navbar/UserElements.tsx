//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";


//First Party Imports
import './Navbar.scss'
import { Button } from '../../Components/Button/Button';
import { useFetch } from "../../Helpers/Fetch";
import { useAuthenticate } from '../../Helpers/Authenticate';
import { IAuthRequestReturn } from '../../Interfaces/Authenticate';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


interface logoutRequestReturn {
  msg: string
}


export function UserElements (props: IElevatedStateProps){
  const {elevatedState, setElevatedState, ...navProps} = props;

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
  const apiFetch = useFetch(setFetching, setElevatedState, setLogoutResponse, `/api/users/logout`, () => requestOptions, logoutResponse)

  useEffect(() => {
    if(!fetching) return;
    apiFetch()
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
      <Nav.Link>
        <NavLink to="/account" activeClassName="navSelected" className="nav-link borderRadius-2">
          Account
        </NavLink>
      </Nav.Link>
      <Nav.Link>
        <Button className="neumorphic borderRadius-2 py-2 px-3 w-100" onClick={() => setFetching(true)} disabled={fetching || authenticating}>
          Logout
        </Button>
      </Nav.Link>
      </>
    );
  }
  else{
    return (
      <>
      <Nav.Link>
        <NavLink to="/login" activeClassName="navSelected" className="nav-link borderRadius-2">
          Login
        </NavLink>
      </Nav.Link>
      <Nav.Link>
        <NavLink to="/register" activeClassName="navSelected" className="nav-link borderRadius-2">
          Register
        </NavLink>
      </Nav.Link>
      </>
    );
  }
}