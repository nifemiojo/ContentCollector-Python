import React, { useState } from 'react';
import { Avatar, Button, TextField, Link,
  Grid, CssBaseline, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLocation } from 'react-router';
import { parse } from 'query-string';


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPasswordForm() {
  const classes = useStyles();
  const location = useLocation();
  const [passwordProps, resetPassword] = useInput("");
  const [error, toggleError] = useState(false)
  const [success, toggleSuccess] = useState(false)
  const csrftoken = Cookies.get('csrftoken');

  const params = parse(location.search);
  console.log(params);

  const config = {
      url: '/auth/password-reset-complete/',
      method: 'patch',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
      },
      data: JSON.stringify({
        password: passwordProps.value,
        token: params.token,
        uidb64: params.uidb64,
      }),
  };

  const submit = e => {
      e.preventDefault();
      axios.request(config)
          .then((data) => toggleSuccess(true))
          .catch((err) => toggleError(true));
      resetPassword();
      toggleError(false);
  }

  function ErrorMessage() {
      return (
          <Typography>
              Invalid Registration Credentials
          </Typography>
      )
  }
  
  function SuccessMessage() {
      return (
          <Typography>
              Successfully Reset Password.
          </Typography>
      )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {error && <ErrorMessage />}
        {success && <SuccessMessage />}
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...passwordProps}
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Reset Password
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}