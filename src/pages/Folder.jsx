import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Dashboard from "../BubbleUI/Dashboard"
import CustomizedInputsStyleOverrides from "../stories/TextField"
import  Button  from '../stories/Button';
import ListDividers from "../stories/accept"
import Cookies from 'js-cookie';
import useToken from '../components/useToken';
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
const Folder = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  metaData['email'] = email
 
  const [update, setUpdate] = useState(0)
  const [foldername, setFoldername] = useState("")
  const [date_err,setDR] = useState(100)
  const [email_,setSID] = useState('')
  const { token, removeToken, setToken } = useToken();
  useEffect(async()=>{
    let api = await fetch(`${DOMAIN}/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    console.log(token)
    console.log(metaData)
    console.log(preapi.data)
    let api2 = await fetch(`${DOMAIN}/date_subtraction_for_paid_version`,{
      headers:{
        Authorization:`Bearer ${preapi.data}`
      }
    })
    api2 = await api2.json()
    setDR(api2['data'])
  },[update])
  const request_add_folder=async()=>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    let api = await fetch(`${DOMAIN}/add_folder/${metaData['firstname']}/${foldername}`,{
      headers:{
        Authorization:`Bearer ${preapi.data}`
      }
    })
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
