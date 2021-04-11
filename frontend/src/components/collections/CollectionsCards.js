import React, { useState } from 'react';
import { Card, Button, CardActions, 
  CardContent, CardMedia,
  Grid, Typography, makeStyles } from '@material-ui/core';
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useCollections } from '../context_providers/CollectionProvider';
import Cookies from 'js-cookie';
import Fetch from '../fetch/Fetch';

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

export default function CollectionsCards({data}) {
    const classes = useStyles();
    const match = useRouteMatch();
    const location = useLocation();
    const csrftoken = Cookies.get('csrftoken');
    const { clickedCollection, setClickedCollection } = useCollections();
    const [startFetch, toggleFetch] = useState(false);

    const config = {
        url: `/api/collections/${data.id}/delete/`,
        method: 'delete',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    };

    function handleDel (e) {
	    	e.preventDefault();
        toggleFetch(true);
    }

    function onDelSuccess({res}) {
      return <Typography>Deleted</Typography>
    }
    
    return(
        <>
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                className={classes.cardMedia}
                image="../../../static/images/collections-image.jpg"
                title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography>
                        {data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                  {match.path == "/collections/"
                    ? <Button size="small" color="primary" variant="contained" onClick={() => setClickedCollection(data)} component={Link} to={`${match.path}${data.id}`}>
                        Edit
                    </Button>
                    :<Button size="small" color="primary" variant="contained" onClick={() => setClickedCollection(data)} component={Link} to={`${location.pathname}${data.id}`}>
                       View
                    </Button>}
                    {match.path == "/collections/" &&
                    (
                    <>
                      <Button size="small" color="secondary" variant="contained" onClick={handleDel}>
                          Delete
                      </Button>
                      {startFetch && 
                      <Fetch 
                      config={config} 
                      renderSuccess={onDelSuccess}
                      />}
                    </>
                    )}
                </CardActions>
            </Card>
        </Grid>
        </>
    )
}