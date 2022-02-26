import React, { useState } from 'react';
import { Avatar, Button, TextField, Link,
  Grid, CssBaseline, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useInput } from '../hooks/UseInput';
import Cookies from 'js-cookie';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RequestResetForm() {
  const classes = useStyles();
  const [emailProps, resetEmail] = useInput("");
  const [error, toggleError] = useState(false)
  const [success, toggleSuccess] = useState(false)
  const csrftoken = Cookies.get('csrftoken');

  const config = {
      url: '/auth/request-reset-email/',
      method: 'post',
      headers: { 
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
      },
      data: JSON.stringify({
        email: emailProps.value,
        redirect_url: 'http://localhost:8080/reset-password/',
      }),
  };

  const submit = e => {
      e.preventDefault();
      axios.request(config)
          .then((data) => toggleSuccess(true))
          .catch((err) => toggleError(true));
      resetEmail();
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
              Successful registration. Check your email for the verification link.
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
          Request Password Reset
        </Typography>
        {error && <ErrorMessage />}
        {success && <SuccessMessage />}
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...emailProps}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
            Request
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