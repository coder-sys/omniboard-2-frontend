import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import Test from "../Quizzes/test"
import GoogleCarousel from '../Carousel/GoogleCarousel';
import TopicSearchCarousel from '../Carousel/TopicSearchCarousel';
import YouTubeCarousel from '../Carousel/YouTubeCarousel';
import { metaData } from '../data/dummy';
import save_data_google from "../functions/save_google_data";
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
          <Typography >{children}</Typography>
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

export default function BasicTabs({displayChart, quizMCQ, search, googlesearch,name, foldername,setConsent,save_data_google,retrievegoogledata1,retrievegoogledata2,description,update_effect,setue,stored_data,djoin,linkjoin}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%',color:'purple' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{color:'purple'}} label="Dynamic" {...a11yProps(0)} />
          <Tab style={{color:'purple'}} label="Quiz" {...a11yProps(1)} />
          <Tab style={{color:'purple'}} label="Google search" {...a11yProps(2)} />
          <Tab style={{color:'purple'}} label="YouTube search" {...a11yProps(3)} />
          <Tab style={{color:'purple'}} label="Topic search" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>

      <FlowChartWithState style={{width:"1%"}} initialValue={displayChart} />

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Test questions={quizMCQ}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {
          [1].map((data)=>{
            if(googlesearch != ""){
            var linkjoin_ = []
            var djoin_ = [] 
            return(
              <GoogleCarousel name={metaData['firstname']}  setConsent={setConsent} foldername={foldername} save_data={save_data_google} email={metaData['email']} lastname={metaData['lastname']} djoin_={djoin_} retrievegoogledata1={retrievegoogledata1} retrievegoogledata2={retrievegoogledata2} description={description} update_effect={update_effect} setue={setue} linkjoin_={linkjoin_} stored_data={stored_data} djoin={djoin} linkjoin={linkjoin}  />

            )
            }
          })
        }
        </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
       <YouTubeCarousel name={name} query={search} foldername={foldername} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <TopicSearchCarousel name={name} query={search} foldername={foldername}/>
      </CustomTabPanel>
    </Box>
  );
}
