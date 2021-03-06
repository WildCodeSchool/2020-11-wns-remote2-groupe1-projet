import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { REGISTER } from '../src/queries';

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

const Register = (): JSX.Element => {
  const router = useRouter();
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>(new Date().toString());
  const [register, { error }] = useMutation(REGISTER, {
    onCompleted: () => {
      router.push('/login');
    },
  });
  const [isEqual, setIsEqual] = useState<boolean>(false);

  const checkPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h2">Login Page</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await register({
            variables: {
              firstName,
              lastName,
              email,
              password,
              school,
              //birthDate,
            },
          });
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              error={!!error}
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
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword(password, confirmPassword);
              }}
              fullWidth
              type="password"
              error={!isEqual && password.length !== 0}
              helperText={'Minimum 8 caractères'}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                checkPassword(password, confirmPassword);
              }}
              error={!isEqual && confirmPassword.length !== 0}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} md={12} className={classes.buttons}>
            <Link href="/login">
              <Button>Se connecter</Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isEqual}
            >
              Créer un compte
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
