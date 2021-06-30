import { gql, useQuery } from '@apollo/client';
import { createContext, useContext, useState } from 'react';

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

export const UserContextProvider = (props) => {
  const { data, loading } = useQuery(GET_ME);

  const me: me | null = data?.me;

  return (
    <UserContext.Provider value={{ me }}>{props.children}</UserContext.Provider>
  );
};
