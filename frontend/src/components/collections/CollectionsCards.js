import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useRouteMatch } from "react-router-dom";
import { useCollections } from '../hooks/CollectionProvider';
import Cookies from 'js-cookie';



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

export default function CollectionsCards({data, key}) {
    const classes = useStyles();
    const match = useRouteMatch();
    console.log(match);
    const { setClickedCollection } = useCollections();
    const csrftoken = Cookies.get('csrftoken');


    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        mode: 'same-origin',
    };

    const handleDel = (e) => {
        console.log("Deleting...");
        fetch(`/api/collections/${data.id}/delete/`, requestOptions)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
        
            // TODO : When a collection is successully deleted, remove and update state
    }

    return(
        <>
        <Grid item key={key} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
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
                  {match.path == "/collections"
                    ? <Button size="small" color="primary" onClick={() => setClickedCollection(data)} component={Link} to={`${match.path}/${data.id}`}>
                        Edit
                    </Button>
                    :<Button size="small" color="primary" onClick={() => setClickedCollection(data)} component={Link} to={`${match.url}/${data.id}`}>
                       View
                    </Button>}
                    {match.path == "/collections" &&
                    <Button size="small" color="secondary" onClick={handleDel}>
                        Delete
                    </Button>}
                </CardActions>
            </Card>
        </Grid>
        </>
    )
}