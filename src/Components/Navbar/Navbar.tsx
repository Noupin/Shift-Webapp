//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";


//First Party Imports
import './Navbar.scss'
import Logo from '../../Assets/icon.png'
import { IElevatedPageState } from "../../Interfaces/PageState";
import { Button } from '../../Components/Button/Button';
import { useFetch } from "../../Hooks/Fetch";
import { useAuthentication } from "../../Hooks/Authenticated";

interface logoutRequestReturn {
  msg: string
}

let logoutResponse: logoutRequestReturn = {msg: ""}


export const NavBar = (props: IElevatedPageState) => {
  const imageStyle = {height: "auto", width: "auto", maxHeight: "30px", maxWidth: "30px"}

  const [isAuthenticated, authenticate] = useAuthentication()
  const [apiFetch, apiResponse, apiError, apiLoading] = useFetch(logoutResponse);


  async function logoutUser() {
    const requestOptions: RequestInit = {
      method: 'GET',
      credentials: "include",
      headers: { 'Content-Type': 'application/json'}
    };

    apiFetch(`/api/users/logout`, requestOptions)
    props.setMsg(apiResponse.msg)

    authenticate()
    props.setAuthenticated(isAuthenticated)
  }


  useEffect(() => {
    console.error(apiError)
  }, [apiError]);


  let userNavElements = (
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
  
  useEffect(() => {
    if(props.authenticated){
      userNavElements = (
        <>
        <Nav.Link>
          <NavLink to="/account" activeClassName="navSelected" className="nav-link borderRadius-2">
            Account
          </NavLink>
        </Nav.Link>
        <Nav.Link>
          <Button className="neumorphic borderRadius-2 py-2 px-3" onClick={logoutUser} disabled={apiLoading}>
            Logout
          </Button>
        </Nav.Link>
        </>
      );
    }
  }, [props.authenticated]);

  return (
    <div className="neumorphic borderRadius-2 mx-2 mt-2 w-100">
      <Navbar sticky="top" expand="lg">
        <Navbar.Brand>
          <NavLink to="/" className="pl-2 borderRadius-2">
            <img style={imageStyle} src={Logo} alt="Shift"/>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink to="/load" activeClassName="navSelected" className="nav-link borderRadius-2">
                Load
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end" key={`${props.authenticated}`}>
            {userNavElements}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}