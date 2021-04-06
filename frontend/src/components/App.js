import React, { useEffect, useState } from "react";
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
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import { useUser } from "./context_providers/UserProvider";
import ProvideAuth, { useAuth } from "./auth/ProvideAuth";
import PrivateRoute from "./auth/PrivateRoute";
import CollectionDetailPage from "./pages/CollectionDetailPage";
import EditContent from "./pages/EditContent";

export default function App() {
  const {user, setUser} = useUser();
  let history = useHistory();
  
  function LandingPage() {
    let auth = useAuth();
    
    function logout () {
      auth.signout(() => {});
      return <Redirect to="/"/>
    };

    return (
      <>
        <Grid container justify="space-evenly" alignItems="center">
          <Grid item xs={4}>
            <Button 
              href="/collections/"
              variant="contained" color="primary"
            >
              Manage Collections
            </Button>
          </Grid>
          <Grid item xs={4}>
          <Button 
            href={user.username ? `/${user.username}/` : `/`}
            variant="contained" color="primary"
          >
            View my profile
          </Button>
          </Grid>
          <Grid item xs={4}>
          <Button 
            onClick={() => logout()}
            variant="contained" color="primary"
          >
            Logout
          </Button>
          </Grid>
        </Grid>
      </>
    )
  }

  function LoggedIn() {
    console.log(user)
    if (Object.keys(user).length === 0) {
      console.log("no user")
      return <Redirect to="/login/"/>
    }
    else {
      return <LandingPage/>
    }
  }

  return (
    <ProvideAuth>
      <div>
        {/* <LoggedIn /> */}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login/" component={SignIn} />
          <Route exact path="/register/" component={SignUp} />
          <Route exact path="/reset-password/" component={SignUp} />
          <PrivateRoute exact path="/collections/" >
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/collections/new/" >
            <CreateCollection />
          </PrivateRoute>
          <PrivateRoute exact path="/collections/:collectionId/" >
            <CollectionDetailPage />
          </PrivateRoute>
          <PrivateRoute exact path="/collections/:collectionId/:contentId/" >
            <EditContent />
          </PrivateRoute>
          <Route exact path="/:username/" component={UserProfile} />
          {/* <Route exact path="/:username/:collectionId/" component={ContentList} /> */}
        </Switch>
      </div>
    </ProvideAuth>
  );
}

axios.defaults.baseURL = 'http://localhost:8080/';
const localState = JSON.parse(localStorage.getItem('user'));

Object.keys(localState).length !== 0 
? axios.defaults.headers.common['Authorization'] = 'Bearer ' + localState.tokens.access 
: axios.defaults.headers.common['Authorization'] = "";