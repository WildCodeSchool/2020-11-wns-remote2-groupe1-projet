import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { MultiContextProvider } from '../Components/contexts/contexts';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import classes from './style.module.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const GRAPHQL_ENDPOINT = '/graphql';

  const httpLink = createUploadLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const webSocketProtocolAndHost = `ws://localhost:4000`;

  const wsLink =
    process.browser &&
    new WebSocketLink({
      uri: `${webSocketProtocolAndHost}${GRAPHQL_ENDPOINT}`,
      options: {
        reconnect: true,
        minTimeout: 10000,
      },
    });

  const splitLink =
    process.browser &&
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );
  console.log('wsLink: ', wsLink);
  console.log(process.env.NEXT_PUBLIC_API_PORT);
  const client = new ApolloClient({
    link: splitLink,
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
