import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, component: 'Home' },
  { text: 'My Stats', icon: <AnalyticsRoundedIcon />, component: 'StatisticsPage ' },
  { text: 'Heroes', icon: <PeopleRoundedIcon />, component: 'CommingSoon' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, component: 'CommingSoon' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
];

export default function MenuContent({ changeComponent }) {
  const [selected, setSelected] = React.useState(0); // Default to the first item

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={index === selected}
              onClick={() => {
                changeComponent(item.component); // Call the function to change the component
                setSelected(index); // Update the selected state
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            selected={index === selected}
            onClick={() => {
              changeComponent(item.component); // Call the function to change the component
              setSelected(index); // Update the selected state
            }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
