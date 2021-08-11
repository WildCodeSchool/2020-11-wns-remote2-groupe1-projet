import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import NavBar from '../components/layout/NavBar';
import { GET_ME } from '../src/queries';
import { GetMe } from '../src/schemaTypes';
import PropTypes from 'prop-types';

export const UserContext = createContext<any>({});

export const MultiContextProvider = ({ children }) => {
  const { data } = useQuery<GetMe>(GET_ME);
  const me = data?.me;

  return (
    <UserContext.Provider value={{ me }}>
      <NavBar>{children}</NavBar>
      {children}
    </UserContext.Provider>
  );
};

MultiContextProvider.propTypes = {
  children: PropTypes.any,
};
