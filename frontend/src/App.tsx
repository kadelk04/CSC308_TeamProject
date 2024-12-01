import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Profile } from './components/pages/Profile';
import { Login } from './components/pages/Login';
import { Dashboard } from './components/pages/Dashboard';
import { Box, CssBaseline } from '@mui/material';
import { Navbar } from './components/common/Navbar';
import { Theme } from './components/common/Theme';

import '@fontsource/roboto';
import PrivateRoute, {
  PrivateRouteProps,
} from './components/common/PrivateRoute';
import { grey } from '@mui/material/colors';

export default function App() {
  const [expanded, setExpanded] = React.useState(false);
  let signedIn = localStorage.getItem('spotify_token');

  const defaultProtectedRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
    authenticationPath: '/login',
    redirectPath: '/', // sessionContext.redirectPath,
    setRedirectPath: () => {}, //setRedirectPath
  };

  return (
    <Theme>
      <Router>
        <Box
          sx={{
            display: 'flex',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.background.default
                : grey[900],
          }}
        >
          <CssBaseline />
          <Navbar expanded={expanded} setExpanded={setExpanded} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              p: 3,
              transition: 'all 0.3s ease',
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute
                    authenticationPath="/login"
                    redirectPath="/dashboard"
                    setRedirectPath={() => {}}
                    outlet={<Dashboard />}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    authenticationPath="/login"
                    redirectPath="/profile"
                    setRedirectPath={() => {}}
                    outlet={<Profile />}
                  />
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </Theme>
  );
}
