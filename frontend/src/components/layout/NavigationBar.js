import React from 'react';
import { AppBar, Link, makeStyles, Toolbar } from '@material-ui/core';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
  })
);
export default function NavigationBar() {
    const classes = useStyles();
    return(
        <AppBar position="relative">
            <Toolbar>
                <BookmarksIcon className={classes.icon} />
                <Link variant="h6" color="inherit" noWrap component={RouterLink} to="/">
                    TechShare
                </Link>
            </Toolbar>
        </AppBar>
    )
}