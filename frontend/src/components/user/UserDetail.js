import { Avatar, Typography } from '@material-ui/core';
import React from 'react';


export default function UserDetail({user}) {
    // Render the profile picture, bio, username
    // Accesses the user object and retrieves information

    return (
        <>
        <Avatar alt="profils pic">{user.slice(0,1)}</Avatar>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" >
            {user}
        </Typography>
        <Typography component="h5" variant="h5" align="center" color="textSecondary" >
            {user}
        </Typography>
        </>
    )
}