import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


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

    return(
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
                <Button size="small" color="primary" component={Link} href={`api/collection/edit/${data.id}`}>
                    View
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="secondary">
                    Delete
                </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}