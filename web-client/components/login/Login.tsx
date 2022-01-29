import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { LOGIN_MUTATION } from '../../src/queries';
import styles from '../../styles/Login.module.scss';

function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      router.push('/');
    },
  });

  return (
    <Paper className={styles.root}>
      <h2>Login Page</h2>
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
          <Grid item xs={12} className={styles.buttons}>
            <Link href="/register">
              <button className={styles.signupBtn}>Sign up</button>
            </Link>
            <button className={styles.loginBtn} type="submit">
              Log in
            </button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
export default LoginComponent;
