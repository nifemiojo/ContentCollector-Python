import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateCollection from "./collections/CreateCollection";
import Home from "./pages/Home";
import CollectionDetail from "./collections/CollectionDetail";

export default function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/collections">Home</Link>
            </li>
            <li>
              <Link to="/">User Profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/collections" component={Home} />
          <Route exact path="/new" component={CreateCollection} />
          <Route exact path="/collections/:collectionId" component={CollectionDetail} />
        </Switch>
      </div>
  );
}

function Login() {
  return <h2>Enter your details to login</h2>;
}

function Register() {
  return <h2>Sign up below</h2>;
}