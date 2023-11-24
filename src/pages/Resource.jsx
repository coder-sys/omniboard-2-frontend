import React,{useState, useEffect} from 'react';

import { useParams } from 'react-router-dom';
import { Stacked, Pie, LineChart, SparkLine } from '../components';
import ResourceBox from '../components/ResourceBox'
import { metaData,earningData, medicalproBranding, recentTransactions, resourceReports, dropdownData, SparklineAreaData, ecomPieChartData, resources } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import 'reactjs-popup/dist/index.css';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import Button from '../stories/Button';
import ResourceFolderCarousel from '../Carousel/ResourceFolderCarousel';
const Resource = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  console.log(email)
  metaData['email'] = email
  const [folders, setFolders] = useState([])
  const [updated, setUpdated] = useState(0)
  const [chartSimple, setChartSimple] = useState({
    offset: {
      x: 0,
      y: 0
    },
    nodes: {
      
      },
   
    links: {
      
    },
    selected: {},
    hovered: {}
  });
  useEffect(async()=>{
    let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    let api1 = await fetch(`http://127.0.0.1:5000/get_folders/${api['firstname']}`)
    api1 = await api1.json()
    console.log(api1['data'])
    setFolders(api1['data'])
  },[updated])
  return (
    <div className="mt-24">
      <ResourceFolderCarousel folders={folders} name={metaData['firstname']} setChartSimple={setChartSimple} />
      <br></br>
        <FlowChartWithState style={{'display':"none"}} initialValue={chartSimple} 
        
       

        />

    </div>
  );
};

export default Resource;