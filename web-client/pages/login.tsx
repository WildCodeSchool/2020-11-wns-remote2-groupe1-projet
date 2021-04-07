import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

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
    maxWidth: 600,
    margin: 'auto',
    marginTop: 64,
    marginBottom: 64,
    padding: 32,
  },
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION);
  return (
    <Paper className={classes.root}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data } = await login({
            variables: { email, password },
          });
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography variant="h2">Login Page</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
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
