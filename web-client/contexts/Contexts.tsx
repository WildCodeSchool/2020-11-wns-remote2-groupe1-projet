import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import NavBarComponent from '../components/NavBar';
import { GET_CURRENT_USER } from '../src/queries';
import { GetCurrentUser } from '../src/schemaTypes';
import PropTypes from 'prop-types';

export const UserContext = createContext<any>({});

export const MultiContextProvider = ({ children }) => {
  const { data } = useQuery<GetCurrentUser>(GET_CURRENT_USER);
  const currentUser = data?.currentUser;

  return (
    <UserContext.Provider value={{ currentUser }}>
      <NavBarComponent>{children}</NavBarComponent>
      {children}
    </UserContext.Provider>
  );
};

MultiContextProvider.propTypes = {
  children: PropTypes.any,
};
