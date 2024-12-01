import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './NavBar';
import Header from './Header';
import MainGrid from './MainGrid';
import SideMenu from './SideMenu';
import ComingSoon from './CommingSoon';
import StatisticsPage from './StatisticPage';

export default function Dashboard(accountId) {

  const [currentComponent, setCurrentComponent] = React.useState('Home');

  // Function to change the displayed component
  const changeComponent = (component) => {
    setCurrentComponent(component);
  };


  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu accountId={accountId} changeComponent={changeComponent}/>
        <AppNavbar  changeComponent={changeComponent}/>
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {currentComponent === 'Home' && <MainGrid accountId={accountId} />}
            {currentComponent === 'CommingSoon' && <ComingSoon accountId={accountId} />}
            {currentComponent === 'StatisticsPage ' && <StatisticsPage accountId={accountId} />}

          </Stack>
        </Box>
      </Box>
      </>
  );
}