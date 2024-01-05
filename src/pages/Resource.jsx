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
import Cookies from 'js-cookie';
const Resource = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
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
  const [date_err, setDR] = useState(1000)
  useEffect(async()=>{
    const cookieValue = Cookies.get('session_id')
   console.log('im looking for',cookieValue)
   let preapi = await fetch(`http://127.0.0.1:5000/session_map/${cookieValue}`)
   preapi = await preapi.json()
    let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${preapi['data']}`)
    api = await api.json()
    metaData['email'] = preapi['data']
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    let api1 = await fetch(`http://127.0.0.1:5000/get_folders/${metaData['firstname']}`)
    api1 = await api1.json()
    console.log(api1['data'])
    setFolders(api1['data'])
    let api2 = await fetch("http://127.0.0.1:5000/date_subtraction_for_paid_version")
    api2 = await api2.json()
    setDR(api2['data'])
  },[updated])
  if(date_err<30){
  return (
    <div className="mt-24">
      <ResourceFolderCarousel folders={folders} name={metaData['firstname']} setChartSimple={setChartSimple} />
      <br></br>
        <FlowChartWithState style={{'display':"none"}} initialValue={chartSimple} 
        
       

        />

    </div>
  );}
  else{
    return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
  }
};

export default Resource;