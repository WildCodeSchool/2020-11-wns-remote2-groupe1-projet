import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import router from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/Contexts';
import { GET_POSTS, GET_RECENT_USERS, UPDATE_USER } from '../../src/queries';
import { GetRecentUsers } from '../../src/schemaTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  dashboardTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1b84c1',
  },
  contentContainer: {
    margin: 'auto',
    paddingTop: '1rem',
    maxWidth: '30%',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridContainer: {
    padding: '1rem',
  },
}));

function Dashboard() {
  const classes = useStyles();

  const { currentUser } = useContext(UserContext);

  const { loading, data } = useQuery<GetRecentUsers>(GET_RECENT_USERS);

  const { data: postData } = useQuery(GET_POSTS, {
    variables: {
      offset: 0,
      limit: 3,
      isPublished: null,
    },
    fetchPolicy: 'cache-and-network',
  });

  const posts: Array<{
    postID: string;
    title: string;
    image: string;
    content: string;
    isPublished: boolean;
    user: any;
  }> = postData?.posts || [];

  const [values, setValues] = useState({
    userID: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        userID: currentUser.userID,
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const changeHandler = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      router.push('/account');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({
      variables: values,
    });
  }

  return (
    <div className={classes.root}>
      <h1
        className={classes.dashboardTitle}
      >{`${currentUser?.username}'s dashboard`}</h1>
      <div className={classes.contentContainer}>
        <h2>Account Information</h2>
        <p>
          Name : <span>{currentUser?.firstName}</span>{' '}
          <span>{currentUser?.lastName}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                name="username"
                value={values.username}
                onChange={changeHandler}
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={changeHandler}
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={changeHandler}
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={changeHandler}
                fullWidth
                type="email"
              />
            </Grid>
            <Grid item xs={12} md={12} className={classes.buttons}>
              <Button variant="contained" color="primary" type="submit">
                Save Edits
              </Button>
            </Grid>
          </Grid>
        </form>

        <h2>Users Overview</h2>
        <div>{loading ? '…' : data?.recentUsers}</div>

        <h2>Posts Overview</h2>
        {posts?.map((post) => {
          return <div key={post.postID}>{post.title}</div>;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
