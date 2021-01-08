//Third Party Imports
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";


//First Party Imports
import './Navbar.scss'
import Logo from '../../Assets/icon.png'
import { IElevatedPageState } from "../../Interfaces/PageState";
import { UserElements } from "./UserElements";


export function NavBar (props: {elevatedState: () => IElevatedPageState, setElevatedState: React.Dispatch<React.SetStateAction<IElevatedPageState>>}){
  const {elevatedState, setElevatedState, ...navProps} = props;
  const imageStyle = {height: "auto", width: "auto", maxHeight: "30px", maxWidth: "30px"}


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
          <Nav className="justify-content-end" key={`${elevatedState().authenticated}`}>
            <UserElements elevatedState={elevatedState} setElevatedState={setElevatedState}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}