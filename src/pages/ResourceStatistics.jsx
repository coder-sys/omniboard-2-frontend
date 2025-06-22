import React,{useState, useEffect} from 'react';

import { useParams } from 'react-router-dom';
import { Stacked, Pie, LineChart, SparkLine } from '../components';
import ResourceBox from '../components/ResourceBox'
import { metaData,earningData, medicalproBranding, recentTransactions, resourceReports, dropdownData, SparklineAreaData, ecomPieChartData, resources } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

import useToken from '../components/useToken';
import  ColorPicker  from './ColorPicker';

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
const ResourceStatistics = () => {

    const { currentColor, currentMode } = useStateContext();
  const {email, foldername} = useParams()
  metaData['email'] = email
  const [folders, setFolders] = useState([])
  const [updated, setUpdated] = useState(0)
  const { token, removeToken, setToken } = useToken();

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
      <ColorPicker foldername={foldername} email={metaData['email']} firstname={metaData['firstname']} />



  )
  }
  else{
    return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
  }
}



export default ResourceStatistics;