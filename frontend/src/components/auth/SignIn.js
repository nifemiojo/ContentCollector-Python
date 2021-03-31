import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
import { useUser } from '../context_providers/UserProvider';
import { Redirect, useHistory, useLocation } from 'react-router';
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
    const csrftoken = Cookies.get('csrftoken');
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    if (Object.keys(auth.user).length > 0) {
        return <Redirect to="/collections/"/>
    }

    const { from } = location.state || { from: { pathname: "/" } };
    const login = (user) => {
        auth.signin(user, () => {
            //history.replace(from);
        });
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
        }),
    };
    
    const submit = e => {
        e.preventDefault();
        axios.request(config)
            .then((res) => login(res.data))
            .catch((err) => console.log(err));
        resetEmail();
        resetPassword();
        console.log("We got to redirect");
    }

    return (
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
                <Link href="/reset-password/" variant="body2">
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
    );
}