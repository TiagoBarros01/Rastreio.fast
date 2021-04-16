import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from '../components/Header';
import PackageHistory from '../components/PackageHistory/index';
import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';

export default function Tracks() {
  return (
    <ThemeProvider theme={dark}>
      <Header />
      <PackageHistory />
      <GlobalStyle />
    </ThemeProvider>
  );
}
