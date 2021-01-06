//Third Party Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";


//First Party Imports
import { IElevatedPageState } from "../../Interfaces/PageState";
import './Navbar.scss'
import Logo from '../../Assets/icon.png'


export const NavBar = (props: IElevatedPageState) => {
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
          <Nav className="justify-content-end">
            <Nav.Link>
              <NavLink to="/account" activeClassName="navSelected" className="nav-link borderRadius-2">
                Account
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}