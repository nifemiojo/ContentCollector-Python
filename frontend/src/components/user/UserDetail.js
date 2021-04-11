import { Container, Typography } from '@material-ui/core';
import React from 'react';

export default function UserDetail({user}) {
    // Render the profile picture, bio, username
    // Accesses the user object and retrieves information

    return (
        <Container maxWidth='lg'>
            {/* <Avatar alt="profils pic">{user.slice(0,1)}</Avatar> */}
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {user}'s collections
            </Typography>
        </Container>
    )
}