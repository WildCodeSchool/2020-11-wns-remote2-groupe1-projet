import { gql, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useState } from 'react';

const REGISTER = gql`
  # Create User
  mutation createUser(
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

const Register = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [register] = useMutation(REGISTER);

  return (
    <Paper>
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
        <TextField
          label="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
          type="text"
        />
        <TextField
          label="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
          type="text"
        />
        <TextField
          label="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type="email"
        />
        <TextField
          label="École"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          fullWidth
          type="text"
        />
        <TextField
          label="Date de naissance"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          type="text"
        />
        <TextField
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
        />
        <Button variant="contained" color="primary" type="submit">
          Créer un compte
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
