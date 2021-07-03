import React from 'react';
// Modules
import { AppProps } from 'next/app';
import Head from 'next/head';
// MUI Core
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// Utils
import theme from '../src/theme';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MultiContextProvider } from '../Components/contexts/contexts';
import classes from './style.module.scss';

import { createUploadLink } from 'apollo-upload-client';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const client = new ApolloClient({
    link: createUploadLink({
      uri: '/graphql',
    }),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <title>My App</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MultiContextProvider>
            <main className={classes.container}>
              <Component {...pageProps} />
            </main>
          </MultiContextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
