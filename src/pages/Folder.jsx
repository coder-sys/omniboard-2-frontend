import React from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Dashboard from "../BubbleUI/Dashboard"
import CustomizedInputsStyleOverrides from "../stories/TextField"
import Box from '@mui/material/Box';

const Folder = () => {
  const { currentColor, currentMode } = useStateContext();
  const {name} = useParams()
  console.log(name)
  metaData['firstname'] = name
  return (
    <div className="mt-24">
     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
              <CustomizedInputsStyleOverrides style={{'marginLeft':"500px"}} />
          <Dashboard />

          </div>

    </div>
  );
};

export default Folder;
