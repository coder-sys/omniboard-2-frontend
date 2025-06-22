import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';

function Sidebar() {
  const [selectedItem, setSelectedItem] = useState('Folders');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedItem(item);

    console.log(selectedItem)
  };

  const items = [
    { text: 'Folders', icon: <HomeIcon /> },
    { text: 'Workspaces', icon: <DashboardIcon /> },
    { text: 'Resources', icon: <MailIcon /> },
  ];

  const sidebarStyle = {
    width: '250px',
  };
  

  const sidebarPaperStyle = {
    backgroundColor: '#FFF', // Light background
    color: '#333', // Text color for items
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '16px',
  };
 

  // Responsive styles
  const responsiveStyles = {
    '@media (max-width: 600px)': {
      sidebarStyle: {
        width: '100%', // Use full width on smaller screens
      },
    },
  };
  return (
    <Drawer variant="permanent" sx={{ ...sidebarStyle, ...responsiveStyles.sidebarStyle }}>
      <Paper sx={sidebarPaperStyle}>
        <List>
          {items.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {handleItemClick(item.text)}}
              selected={selectedItem === item.text}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              {/* Icon for another option */}
            </ListItemIcon>
            <ListItemText primary="Another Option" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              {/* Icon for yet another option */}
            </ListItemIcon>
            <ListItemText primary="Yet Another Option" />
          </ListItem>
        </List>
      </Paper>
    </Drawer>
  );
}

export default Sidebar;
