import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './ManuContent';
import axios from 'axios';
// import SelectContent from './SelectContent';
// import MenuContent from './MenuContent';
// import CardAlert from './CardAlert';
// import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({accountId,changeComponent}) {
    const [data,setData] = React.useState()
    React.useEffect(() => {
        if (!accountId?.accountId) {
          console.log("Account ID is undefined");
          return;
        }
      
        console.log(accountId.accountId);
      
        axios
          .post(`https://ricrym-be.onrender.com/api/account/${accountId.accountId}`)
          .then(function (response) {
            setData(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      }, [accountId]); // Dependency array to run effect when accountId changes
      
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Divider />
      <MenuContent changeComponent={changeComponent}/>
      {/* <CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar src={data?.avatar || "/default-avatar.png"}  />

        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {data?.username}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {data?.email}
           </Typography>
        </Box>
        {/* <OptionsMenu /> */}
      </Stack>
    </Drawer>
  );
}