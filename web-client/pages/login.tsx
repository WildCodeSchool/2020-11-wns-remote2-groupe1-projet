import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      id
      email
    }
  }
`;
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION);
  return (
    <Paper>
      <Typography variant="h2">Login Page</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data } = await login({
            variables: { email, password },
          });
        }}
      >
        <TextField
          label="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type="email"
        />
        <TextField
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
        />
        <Button variant="contained" color="primary" type="submit">
          Connexion
        </Button>
      </form>
    </Paper>
  );
};
export default Login;
