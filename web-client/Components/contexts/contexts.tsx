import React, { createContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import NavBar from '../layout/navbar';

const GET_ME = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      school
    }
  }
`;

export type me = {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
};

export const UserContext = createContext<any>({});

export const MultiContextProvider = ({ children }) => {
  const { data, loading } = useQuery(GET_ME);
  const me: me | null = data?.me;

  return (
    <UserContext.Provider value={{ me }}>
      <NavBar children={children} />
      {children}
    </UserContext.Provider>
  );
};
