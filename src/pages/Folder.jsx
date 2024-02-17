import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Dashboard from "../BubbleUI/Dashboard"
import CustomizedInputsStyleOverrides from "../stories/TextField"
import  Button  from '../stories/Button';
import ListDividers from "../stories/accept"
import Cookies from 'js-cookie';
const DOMAIN = 'http://15.204.238.234:5000'
const Folder = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  metaData['email'] = email
 
  const [update, setUpdate] = useState(0)
  const [foldername, setFoldername] = useState("")
  const [date_err,setDR] = useState(100)
  const [email_,setSID] = useState('')
  useEffect(async()=>{
   
   const cookieValue = Cookies.get('session_id')
   console.log('im looking for',cookieValue)
   let preapi = await fetch(`${DOMAIN}/session_map/${cookieValue}`)
   preapi = await preapi.json()
   setSID(preapi['data'])
    let api = await fetch(`${DOMAIN}/email_to_name_map/${preapi['data']}`)
    api = await api.json()
    metaData['email'] = preapi['data']
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    console.log(metaData)
    let api2 = await fetch(`${DOMAIN}/date_subtraction_for_paid_version`)
    api2 = await api2.json()
    setDR(api2['data'])
  },[update])
  const request_add_folder=async()=>{
    let api = await fetch(`${DOMAIN}/add_folder/${metaData['firstname']}/${foldername}`)
    api = await api.json()
    window.location.reload()
  }
  if(date_err<30 ){
  return (
    <div className="mt-24">
                    <CustomizedInputsStyleOverrides keyDown={()=>{request_add_folder()}} ph={"Create Folder"} name={foldername} setName={setFoldername} style={{'marginLeft':"50px"}} />
             <div style={{marginLeft:"50px"}}>
               <Button onClick={async()=>{
                request_add_folder()
}}  backgroundColor={"#D0BCFF"} size="small" label={"Create folder"} />
               </div>
     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">


          <Dashboard />
          <ListDividers  email={metaData['email']} type={"folders"} />

          </div>
         
    </div>
  );

}
if(date_err>=30){
 return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
}
};

export default Folder;
