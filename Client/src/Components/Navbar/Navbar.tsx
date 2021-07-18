//Third Party Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";


//First Party Imports
import './Navbar.scss'
import Logo from '../../Assets/icon.png'
import { UserElements } from "./UserElements";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


export function NavBar (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  const imageStyle = {height: "auto", width: "auto", maxHeight: "30px", maxWidth: "30px"}


  return (
    <div className="neumorphic borderRadius-2 p-2 w-100 m-3">
      <Navbar sticky="top" expand="lg" className="p-0"
        variant={elevatedState().frontEndSettings.darkMode ? "dark" : "light"}>
        <Navbar.Brand>
          <NavLink to="/" className="pl-2 borderRadius-2">
            <img style={imageStyle} src={Logo} alt="Shift"/>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="mx-2">
              <NavLink to="/load" activeClassName="navSelected"
                className="nav-link borderRadius-2 px-4">
                Load
              </NavLink>
            </div>
          </Nav>
          <Nav className="justify-content-end" key={`${elevatedState().authenticated}`}>
            <UserElements elevatedState={elevatedState} setElevatedState={setElevatedState} key={`${elevatedState().authenticated}`}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}