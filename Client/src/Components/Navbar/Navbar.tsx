//Third Party Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'


//First Party Imports
import './Navbar.scss'
import Logo from '../../Assets/icon.png'
import { UserElements } from "./UserElements";
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';


export function NavBar (props: IElevatedStateProps){
  const {elevatedState, setElevatedState} = props;
  const imageStyle = {height: "auto", width: "auto", maxHeight: "30px", maxWidth: "30px"}


  return (
    <div className="neumorphic borderRadius-2 p-2 w-100 m-2">
      <Navbar sticky="top" expand="lg" className="p-0"
        variant={elevatedState.frontEndSettings.darkMode ? "dark" : "light"}>
        <Navbar.Brand>
          <NavLink to="/" className="pl-2 borderRadius-2">
            <img style={imageStyle} src={Logo} alt="Shift"/>
          </NavLink>
        </Navbar.Brand>

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{boxShadow: 'none'}}/>
          <Nav className="justify-content-end navbar-toggler"
            style={{boxShadow: 'none', border: 'none', padding: 0}}>
            <div className="mx-2">
              <NavLink to="/settings" className="nav-link-2 px-2">
                <FontAwesomeIcon className="spinAnimation" icon={faCog}/>
              </NavLink>
            </div>
          </Nav>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="mx-2">
              <NavLink to="/load" activeClassName="navSelected"
                className="nav-link borderRadius-2 px-4">
                Load
              </NavLink>
            </div>
          </Nav>
          <Nav className="justify-content-end" key={`${elevatedState.authenticated}`}>
            <UserElements elevatedState={elevatedState} setElevatedState={setElevatedState} key={`${elevatedState.authenticated}`}/>
          </Nav>
        </Navbar.Collapse>

        <Nav id="basic-navbar-nav" className="navbar-collapse collapse"
          style={{boxShadow: 'none', border: 'none', padding: 0, flex: 'none'}}>
          <div className="mx-2">
            <NavLink to="/settings" className="nav-link-2 px-2">
              <FontAwesomeIcon className="spinAnimation" icon={faCog} style={{fontSize: '1.25rem'}}/>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}