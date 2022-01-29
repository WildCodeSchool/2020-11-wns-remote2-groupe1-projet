import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { LOGIN_MUTATION, REGISTER } from '../../src/queries';
import styles from '../../styles/Login.module.scss';

const Register = (): JSX.Element => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [register, { error }] = useMutation(REGISTER);
  const [login, { error: loginError }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      router.push('/');
    },
  });
  const [isEqual, setIsEqual] = useState<boolean>(false);
  const [minLength, setMinLength] = useState<boolean>(false);
  const [passwordEmpty, setPasswordEmpty] = useState<boolean>(true);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] =
    useState<boolean>(true);

  useEffect(() => {
    const checkPassword = (password, confirmPassword) => {
      if (password == confirmPassword) {
        setIsEqual(true);
      } else if (password !== confirmPassword) {
        setIsEqual(false);
      }

      if (password.length >= 8 && confirmPassword.length >= 8) {
        setMinLength(true);
      } else {
        setMinLength(false);
      }

      password.length > 0 ? setPasswordEmpty(false) : setPasswordEmpty(true);
      confirmPassword.length > 0
        ? setConfirmPasswordEmpty(false)
        : setConfirmPasswordEmpty(true);
    };
    checkPassword(password, confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Paper className={styles.root}>
      <h2>Create Account</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await register({
            variables: {
              username,
              firstName,
              lastName,
              email,
              password,
            },
          });
          login({
            variables: {
              email,
              password,
            },
          });
        }}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
              type="password"
              error={(!isEqual || !minLength) && !passwordEmpty}
              helperText={'8 characters minimum required'}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              required
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              error={(!isEqual || !minLength) && !confirmPasswordEmpty}
              fullWidth
              type="password"
            />
          </Grid>
          <Grid item xs={12} md={12} className={styles.buttons}>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isEqual || !minLength}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
