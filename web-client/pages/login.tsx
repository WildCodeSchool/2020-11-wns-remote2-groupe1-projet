import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useInAppUserProvider } from '../Components/AppProviders/UserContext';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      id
      email
    }
  }
`;

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
const Login: NextPage = () => {
  const me = useInAppUserProvider();
  const router = useRouter();
  const classes = useStyles();

  if (me) {
    router.push('/account');
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      router.push('/account');
    },
  });
  return (
    <Paper className={classes.root}>
      <Typography variant="h2">Login Page</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data } = await login({
            variables: { email, password },
          });
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Link href="/register">
              <Button>Créer un compte</Button>
            </Link>
            <Button variant="contained" color="primary" type="submit">
              Connexion
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default Login;
