import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Typography } from '@material-ui/core';
// import 'fontsource-roboto';

const App = (): JSX.Element => {
  return (
    <div>
      <Typography>
        <Header />
        <Footer />
      </Typography>
    </div>
  );
};

export default App;
