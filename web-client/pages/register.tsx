import { gql, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

const REGISTER = gql`
  # Create User
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $password: String!
    $school: String!
    $email: String!
  ) {
    createUser(
      input: {
        firstname: $firstname
        lastname: $lastname
        password: $password
        email: $email
        school: $school
      }
    ) {
      firstname
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

const Register = () => {
  const classes = useStyles();
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [register] = useMutation(REGISTER);

  return (
    <Paper className={classes.root}>
      <Typography variant="h2">Login Page</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data } = await register({
            variables: {
              firstname,
              lastname,
              email,
              password,
              school,
              birthDate,
            },
          });
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="École"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date de naissance"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} md={12} className={classes.buttons}>
            <Link href="/login">
              <Button>Se connecter</Button>
            </Link>
            <Button variant="contained" color="primary" type="submit">
              Créer un compte
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
