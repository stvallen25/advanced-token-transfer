import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

interface IAppThemeProvider {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<IAppThemeProvider> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
