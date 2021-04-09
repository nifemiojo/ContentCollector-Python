import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router';
import UserDetail from "../user/UserDetail";
import Fetch from "../fetch/Fetch"
import CollectionsCards from "../collections/CollectionsCards";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function DisplayCards({data}) { 

    return (
    <>
    <Grid container spacing={4}>
      {data.map((data, i) => <CollectionsCards data={data} key={i}/>)}
    </Grid>
    </>
    )
  }

export default function UserProfile() {
    const { username } = useParams();
    const classes = useStyles();
    const [startFetch, toggleFetch] = useState(false);

    const config = {
      url: `api/collections/public/${username}/`,
      method: 'get',
    }

    useEffect(() => {
      toggleFetch(true)
      return () => {
        toggleFetch(false)
      }
    }, [])

    return (
        <>
        <div className={classes.heroContent}>
          <UserDetail user={username}/>
        </div>
        <Container className={classes.cardGrid} maxWidth='lg'>
          {startFetch && <Fetch config={config} renderSuccess={DisplayCards} />}
        </Container>
        </>
    );
  }