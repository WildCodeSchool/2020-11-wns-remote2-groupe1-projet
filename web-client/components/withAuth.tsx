import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../contexts/Contexts';

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== 'undefined') {
      const { currentUser } = useContext(UserContext);
      const [loggedIn, setLoggedIn] = useState<boolean>(null);
      const Router = useRouter();

      useEffect(() => {
        currentUser ? setLoggedIn(true) : setLoggedIn(false);

        const checkLoginStatus = setTimeout(() => {
          if (loggedIn !== undefined) {
            if (currentUser) {
              return;
            } else {
              Router.replace('./login');

              return;
            }
          }
        }, 500);

        return () => clearTimeout(checkLoginStatus);
      }, [currentUser]);

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
