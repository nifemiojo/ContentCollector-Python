import React, { useEffect, useState } from 'react';
import { Grid, Button, Container, 
    Typography, makeStyles } from '@material-ui/core';
import Fetch from '../fetch/Fetch';
import { useAuth } from '../auth/ProvideAuth';
import { Redirect } from 'react-router';
import DisplayCollections from '../collections/DisplayCollections';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  let auth = useAuth();
  const [startFetch, toggleFetch] = useState(false);

  useEffect(() => {
    toggleFetch(true)
    return () => {
      toggleFetch(false)
    }
  }, [])

  const logout = () => {
      auth.signout(() => {});
      return <Redirect to="/"/>
  };

  const config = {
    url: '/api/collections/',
    method: 'get',
  };

  return (
    <>
      <div className={classes.heroContent}>
        <Container>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            {auth.user.username}'s collections
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Mange your collections here.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button href="/collections/new/" variant="contained" color="primary">
                  + New Collection
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => logout()}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} >
          {startFetch && <Fetch config={config} renderSuccess={DisplayCollections}/>}
      </Container>
    </>
  );
}