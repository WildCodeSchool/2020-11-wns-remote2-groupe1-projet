import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import NavBar from './layout/NavBar';
import { GET_CURRENT_USER } from '../src/queries';
import { GetCurrentUser } from '../src/schemaTypes';
import PropTypes from 'prop-types';

export const UserContext = createContext<any>({});

export const MultiContextProvider = ({ children }) => {
  const { data } = useQuery<GetCurrentUser>(GET_CURRENT_USER);
  const currentUser = data?.currentUser;

  return (
    <UserContext.Provider value={{ currentUser }}>
      <NavBar>{children}</NavBar>
      {children}
    </UserContext.Provider>
  );
};

MultiContextProvider.propTypes = {
  children: PropTypes.any,
};
