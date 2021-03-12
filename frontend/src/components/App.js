import HomePage from "./HomePage"
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateCollection from "./CreateCollection";

export default function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/feed">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/feed" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/collection/create" component={CreateCollection} />
        </Switch>
      </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Login() {
  return <h2>Enter your details to login</h2>;
}

function Register() {
  return <h2>Sign up below</h2>;
}