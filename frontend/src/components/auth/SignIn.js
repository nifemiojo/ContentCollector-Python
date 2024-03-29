import React, { useState } from 'react';
import { Avatar, Button, TextField, 
    FormControlLabel, Checkbox, Link,
    Grid, CssBaseline, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { useAuth } from './ProvideAuth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
    const [emailProps, resetEmail] = useInput("");
    const [passwordProps, resetPassword] = useInput("");
    const [error, toggleError] = useState(false)
    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();
    let auth = useAuth();

    if (Object.keys(auth.user).length > 0) {
        return <Redirect to="/"/>
    }

    const login = (user) => {
        auth.signin(user, () => {});
    };

    const config = {
        url: '/auth/login/',
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify({
            email: emailProps.value,
            password: passwordProps.value,
            authorization: "",
        }),
    };
    
    const submit = e => {
        e.preventDefault();
        axios.request(config)
            .then((res) => login(res.data))
            .catch((err) => toggleError(true));
        resetEmail();
        resetPassword();
        toggleError(false);
    }

    function ErrorMessage() {
        return (
            <Typography>
                Invalid Login Credentials
            </Typography>
        )
    }

    return (
    <>
    {/* <Reroute /> */}
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <div className={classes.form}>
            {error && <ErrorMessage />}
            <TextField
            {...emailProps}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            />
            <TextField
            {...passwordProps}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            />
            <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.submit}
            >
            Sign In
            </Button>
            <Grid container>
            <Grid item xs>
                <Link href="/request-reset/" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="/register/" variant="body2">
                {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
            </Grid>
        </div>
        </div>
    </Container>
    </>
    );
}