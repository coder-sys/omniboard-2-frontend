import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dynamic" {...a11yProps(0)} />
          <Tab label="Quiz" {...a11yProps(1)} />
          <Tab label="Google search" {...a11yProps(2)} />
          <Tab label="YouTube search" {...a11yProps(3)} />
          <Tab label="Topic search" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Dynamic
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Quiz
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Google search
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        YouTube search
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Topic search
      </CustomTabPanel>
    </Box>
  );
}
