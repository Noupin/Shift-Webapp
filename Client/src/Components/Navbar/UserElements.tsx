/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


//First Party Imports
import { Button } from '../../Components/Button/Button';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { LogoutResponse } from '../../Swagger';
import { currentUser } from '../../Helpers/User';
import { useFetch } from '../../Hooks/Fetch';
import './Navbar.scss'


export function UserElements (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;

  const [fetching, setFetching] = useState(false);
  const [logoutResponse, setLogoutResponse] = useState<LogoutResponse>();
  const fetchLogout = useFetch(elevatedState().APIInstaces.Authenticate,
                               elevatedState().APIInstaces.Authenticate.logout,
                               setElevatedState, setLogoutResponse, setFetching)

  const history = useHistory();


  useEffect(() => {
    if(!fetching) return;

    fetchLogout()
  }, [fetching]);

  useEffect(() => {
    if (!logoutResponse) return;

    setElevatedState((prev) => ({...prev, msg: logoutResponse.msg!, accessToken: "", authenticated: false}))
    history.push("/")
  }, [logoutResponse]);


  if(elevatedState().authenticated){
    return (
      <>
      <div className="mx-1 my-1">
        <NavLink to={`/user/${currentUser().username}`} activeClassName="navSelected" className="nav-link borderRadius-2 px-3">
          Account
        </NavLink>
      </div>
      <div className="mx-1 my-1">
        <Button className="neumorphic borderRadius-2 py-2 px-3 w-100 nav-link" onClick={() => setFetching(true)} disabled={fetching}>
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