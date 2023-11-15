import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Dashboard from "../BubbleUI/Dashboard"
import CustomizedInputsStyleOverrides from "../stories/TextField"
import Box from '@mui/material/Box';
import  Button  from '../stories/Button';
import ListDividers from "../stories/accept"
const Folder = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  console.log(email)
  metaData['email'] = email
  const [update, setUpdate] = useState(0)
  const [foldername, setFoldername] = useState("")
  useEffect(async()=>{
    let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    console.log(metaData)
    
  },[update])
  const request_add_folder=async()=>{
    let api = await fetch(`http://127.0.0.1:5000/add_folder/${metaData['firstname']+metaData['lastname']+metaData['email']}/${foldername}`)
    api = await api.json()
    window.location.reload()
  }
  return (
    <div className="mt-24">
                    <CustomizedInputsStyleOverrides keyDown={()=>{request_add_folder()}} ph={"Create Folder"} name={foldername} setName={setFoldername} style={{'marginLeft':"50px"}} />
             <div style={{marginLeft:"50px"}}>
               <Button onClick={async()=>{
                console.log('testing')
                request_add_folder()
}}  backgroundColor={"#D0BCFF"} size="small" label={"Create folder"} />
               </div>
     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">


          <Dashboard />
          <ListDividers  email={email} type={"folders"} />

          </div>
         
    </div>
  );
};

export default Folder;
