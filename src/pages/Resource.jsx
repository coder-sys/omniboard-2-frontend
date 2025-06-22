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
import BusinessChatbot from "./BusinessChatbot";
import NucleusLogo from "../components/NucleusLogo";

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
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
  // Business AI Chatbot UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0c3fc] to-[#8ec5fc] relative">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full opacity-30 blur-2xl animate-float-slow z-0" style={{filter:'blur(80px)',top:'-80px',left:'-80px'}}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-2xl animate-float-slower z-0" style={{filter:'blur(100px)',bottom:'-120px',right:'-120px'}}></div>
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/80 shadow-2xl rounded-3xl px-10 py-12 border border-[#e0c3fc] backdrop-blur-xl flex flex-col items-center">
          <NucleusLogo className="w-20 h-20 mb-4" />
          <h1 className="text-4xl font-extrabold text-[#7c3aed] mb-2 tracking-tight drop-shadow-lg text-center">NOVA Business AI</h1>
          <p className="text-gray-500 text-lg mb-8 text-center">Your smart assistant for business insights, strategy, and productivity. Ask anything about your company, teams, or business growth.</p>
          <BusinessChatbot userEmail={email} userName={metaData['firstname']} />
        </div>
      </div>
 
    </div>
  );}
  else{
    return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
  }
};

export default Resource;
