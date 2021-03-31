import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";
import CreateCollection from "./collections/CreateCollection";
import Home from "./pages/Home";
import CollectionDetail from "./collections/CollectionDetail";
import UserProfile from "./pages/UserProfile";
import ContentList from "./content/ContentList"
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useUser } from "./context_providers/UserProvider";
import ProvideAuth from "./auth/ProvideAuth";

export default function App() {
  const {user, setUser} = useUser();
  let history = useHistory();

  function LoggedIn() {
    if (Object.keys(user).length === 0) {
      return <Redirect to="/login/"/>
    }
    else {
      return <Redirect to="/collections/"/>
    }
  }
  
  return (
    <ProvideAuth>
      <LoggedIn />
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login/" component={SignIn} />
          <Route exact path="/register/" component={SignUp} />
          <Route exact path="/reset-password/" component={SignUp} />
          <Route exact path="/collections/" component={Home} />
          <Route exact path="/collections/new/" component={CreateCollection} />
          <Route exact path="/collections/:collectionId/" component={CollectionDetail} />
          <Route exact path="/:username/" component={UserProfile} />
          <Route exact path="/:username/:collectionId/" component={ContentList} />
        </Switch>
      </div>
    </ProvideAuth>
  );
}