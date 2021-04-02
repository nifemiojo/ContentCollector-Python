import React, { createContext, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CollectionsCards from '../collections/CollectionsCards';
import Fetch from '../fetch/Fetch';
import { useAuth } from '../auth/ProvideAuth';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function DisplayCards({data}) { 
  if (Object.keys(data).length === 0) {
    return (
      <Typography component="h1" variant="h2" align="center" color="textPrimary">
        Create a new collection!
      </Typography>
    );
  }
  return (
    <>
    <Grid container spacing={4}>
      {data.map((data, i) => <CollectionsCards data={data} key={i}/>)}
    </Grid>
    </>
  );
}

export default function Home() {
  const classes = useStyles();
  let auth = useAuth();
  const [startFetch, toggleFetch] = useState(false)

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
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              My collections
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
                  <Button variant="outlined" color="primary" onClick={() => logout()}>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
              {startFetch && <Fetch config={config} renderSuccess={DisplayCards}/>}
          </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Created by the CC Team
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Share your influences!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}