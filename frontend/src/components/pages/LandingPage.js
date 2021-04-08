import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Redirect, useLocation } from "react-router";
import { useAuth } from "../auth/ProvideAuth";
import { useUser } from "../context_providers/UserProvider";
import '../../general.css';


export default function LandingPage() {
    let auth = useAuth();
    const location = useLocation();
    const {user, setUser} = useUser();

    function logout () {
      auth.signout(() => {});
      return <Redirect to="/"/>
    };

    if (Object.keys(user).length !== 0 && location.pathname === "/") {
      return (
        <>
          <Grid container justify="center" alignItems="center" className="parent-grid">
            <Grid item xs={12}>
                <Typography align="center" variant="h1">Welcome {user.username}!</Typography>
            </Grid>  
            <Grid container justify="space-evenly" item xs={12}>
                <Button 
                href="/collections/"
                variant="contained" color="primary"
                >
                Manage Collections
                </Button>
                <Button 
                href={user.username ? `/${user.username}/` : `/`}
                variant="contained" color="primary"
                >
                View my profile
                </Button>
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
    } else if (Object.keys(user).length === 0 && location.pathname === "/") {
      return (
        <>
        <Grid container justify="center" alignItems="center" spacing={1} className="parent-grid">
            <Grid item xs={12}>
                <Typography align="center" variant="h1">TechShare</Typography>
            </Grid>   
            <Grid container justify="space-evenly" item xs={6}>
                <Button variant="contained" color="primary" href="/login/">Login</Button>
                <Button variant="contained" color="primary" href="/register/">Register</Button>
            </Grid>
        </Grid>
        </>
      )
    }
    else return null;
}