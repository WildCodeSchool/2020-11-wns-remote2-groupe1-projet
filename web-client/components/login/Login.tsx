import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { LOGIN_MUTATION } from '../../src/queries';

const useStyles = makeStyles({
  root: {
    padding: 32,
    maxWidth: 600,
    margin: 'auto',
    marginTop: 64,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function LoginComponent() {
  const router = useRouter();
  const classes = useStyles();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      router.push('/');
    },
  });

  return (
    <Paper className={classes.root}>
      <Typography variant="h2">Login Page</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const {} = await login({
            variables: { email, password },
          });
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
            <Button variant="contained" color="primary" type="submit">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
export default LoginComponent;
