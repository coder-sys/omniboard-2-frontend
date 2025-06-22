import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react"
import { metaData } from "../data/dummy";
import useToken from '../components/useToken';
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
export default function Share({name,foldername, open, setOpen, setUpdate}) {
  const [recieverEmail, setRecieverEmail] = useState("j")
  const { token, removeToken, setToken } = useToken();
  const handleClick = async() => {
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', metaData['email'])
    console.log(`sharing folder ${foldername} to ${recieverEmail} from ${name} `)
    let api = await fetch(`${DOMAIN}/share_folder/${foldername}/${metaData['email']}/${recieverEmail}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api = await api.json()
    console.log(api)
    setUpdate(p=>p+1);
    setOpen(false);
    alert("folder has been sent")
  };

  const handleClose = async(event, reason) => {
    
    setOpen(false);
  };

  const action = (
    <React.Fragment>

<Button color="secondary" size="small" onClick={()=>{handleClick()}}>
        Send to 
      </Button>
       
      <input style={{"backgroundColor":"black"}} placeholder={`Enter the recievers email`} onChange={(e)=>setRecieverEmail(e.target.value)} onKeyPress={(e)=>{if(e.key === 'Enter'){handleClick()}}} />
      <br></br>
    
      
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar style={{'width':"290px",'marginBottom':"60px"}}
        open={open}
        autoHideDuration={30000}
        onClose={handleClose}
        message=""
        action={action}
      />
    </div>
  );
}
