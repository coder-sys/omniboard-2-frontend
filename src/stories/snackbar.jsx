import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { metaData } from '../data/dummy';
import useToken from '../components/useToken';
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
export default function Row({sourcename,sender,reciever,message,type}) {
  const [open, setOpen] = React.useState(true);
  const { token, removeToken, setToken } = useToken();

  if(type=='f'){
  const handleClick = () => {
    setOpen(true);
  };

  const handleYes = async() =>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', metaData['email'])
    let api = await fetch(`${DOMAIN}/add_folder/${metaData['firstname']}/${sourcename} shared by ${sender}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api = await api.json();
    let api2 = await fetch(`${DOMAIN}/delete_folder_in_request/${sourcename}/${sender}/${reciever}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api2 = await api2.json()
    console.log(api2['data'])
    setOpen(false);
    window.location.reload();
  }
  
  const handleNo = async() =>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', metaData['email'])
    let api = await fetch(`${DOMAIN}/delete_folder_in_request/${sourcename}/${sender}/${reciever}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api = await api.json()
    console.log(api['data'])
    setOpen(false);

  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
     <React.Fragment>
     <Button style={{"fontSize":"10px"}}>{message}    </Button>
      <Button  style={{"fontSize":"10px"}} color="secondary" size="small" onClick={()=>handleYes()}>
        Yes
      </Button>
      <Button style={{"fontSize":"10px"}} color="secondary" size="small" onClick={()=>handleNo()}>
        No
      </Button>
    </React.Fragment>
    </div>
  );
  }

  else if(type=='w'){
    console.log("please come",sourcename)
    const handleClick = () => {
      setOpen(true);
    };
    const handleYes = async() =>{
      let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', metaData['email'])
      console.log()
      let api = await fetch(`${DOMAIN}/add_workspace/${metaData['firstname']}/${sourcename} shared by ${sender}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      api = await api.json();
      console.log(sender,reciever,'dd')
      let api2 = await fetch(`${DOMAIN}/delete_workspace_in_request/${sourcename}/${sender}/${metaData['firstname']}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      api2 = await api2.json()
      console.log(api2['data'])
      setOpen(false);
      window.location.reload();
    }
    
    const handleNo = async() =>{
      
      console.log(sender,reciever,'dd')
      let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
      preapi = await preapi.json()
      setToken(preapi.data)
      localStorage.setItem('email', metaData['email'])
      let api = await fetch(`${DOMAIN}/delete_workspace_in_request/${sourcename}/${sender}/${metaData['firstname']}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      api = await api.json()
      console.log(api['data'])
      setOpen(false);
  
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  
    return (
      <div>
        
       <React.Fragment>
       <Button style={{"fontSize":"10px"}}>{message}    </Button>
        <Button  style={{"fontSize":"10px"}} color="secondary" size="small" onClick={()=>handleYes()}>
          Yes
        </Button>
        <Button style={{"fontSize":"10px"}} color="secondary" size="small" onClick={()=>handleNo()}>
          No
        </Button>
      </React.Fragment>
      </div>
    );
  }
}
