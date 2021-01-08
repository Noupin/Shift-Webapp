//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";


//First Party Imports
import './Navbar.scss'
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { useFetch } from "../../Helpers/Fetch";
import { useAuthenticate } from '../../Helpers/Authenticate';
import { IAuthRequestReturn } from '../../Interfaces/Authenticate';


interface logoutRequestReturn {
  msg: string
}

let logoutResponse: logoutRequestReturn = {msg: ""}


export const UserElements = (props: IElevatedPageState) => {
  const [authenticating, setAuthenticating] = useState(false);
  const [authenticatedResponse, setAuthenticatedResponse] = useState<IAuthRequestReturn>()

  const [fetching, setFetching] = useState(false);
  const [logoutResponse, setLogoutResponse] = useState<logoutRequestReturn>();

  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json'}
  };

  useAuthenticate(() => authenticating, setAuthenticating, props.setError, setAuthenticatedResponse)
  useFetch(() => fetching, setFetching, props.setError, setLogoutResponse, `/api/users/logout`, () => requestOptions)

  useEffect(() => {
    if(!authenticatedResponse) return;
    props.setAuthenticated(authenticatedResponse!.authenticated)
  }, [authenticatedResponse]);


  useEffect(() => {
    if(!fetching) return;
    props.setMsg(logoutResponse!.msg);
  });



  if(props.authenticated()){
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