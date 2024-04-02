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
import useToken from '../components/useToken';

const DOMAIN = 'https://espark-apis.afd.enterprises'
const Resource = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  metaData['email'] = email
  const [folders, setFolders] = useState([])
  const [updated, setUpdated] = useState(0)
  const { token, removeToken, setToken } = useToken();

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
    
    let api = await fetch(`${DOMAIN}/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    let api1 = await fetch(`${DOMAIN}/get_folders/${metaData['firstname']}`,{
      headers:{
        Authorization:`Bearer ${preapi.data}`
      }
    })
    api1 = await api1.json()
    console.log(api1['data'])
    setFolders(api1['data'])
    let api2 = await fetch(DOMAIN+"/date_subtraction_for_paid_version",{
      headers:{
        Authorization:`Bearer ${preapi.data}`
      }
    })
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
