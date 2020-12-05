//Third Party Imports
import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Nav } from "react-bootstrap";

//First Party Imports
import { Register } from "./User/Register";
import { Login } from "./User/Login";

export default function App() {
  return (
    <Router>
      <div>
      <Nav variant="pills" defaultActiveKey="/home">
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

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
