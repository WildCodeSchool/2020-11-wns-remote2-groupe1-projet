import { gql, useQuery } from '@apollo/client';
import { createContext, useContext } from 'react';

const GET_ME = gql`
  query GetMe {
    me {
      id
      firstname
      lastname
      school
    }
  }
`;

export type me = {
  id: string;
  firstname: string;
  lastname: string;
  school: string;
};

const Context = createContext({ me: null });

export const UserProvider = ({ children }) => {
  const { data } = useQuery(GET_ME);
  const me = data?.me;
  return <Context.Provider value={me} children={children} />;
};

export const useInAppUserProvider = () => {
  const state = useContext(Context);
  return state;
};
