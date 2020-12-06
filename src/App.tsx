//Third Party Imports
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router,
  Switch, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

//First Party Imports
import { Register } from "./Modules/User/Register";
import { Login } from "./Modules/User/Login";
import { Logout } from "./Modules/User/Logout";


export default function App() {
  return (
    <Router>
      <div className="body">
        <Nav variant="pills" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link >
              <Link to="/register">Register</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/logout">Logout</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}