import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
  })
);

export default function Footer() {
    const classes = useStyles();

    return(
        <footer className="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Created by Femi Ojo
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Share your influences!
            </Typography>
        </footer>
    )
}