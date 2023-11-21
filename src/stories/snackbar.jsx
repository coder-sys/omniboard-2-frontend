import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { metaData } from '../data/dummy';
export default function Row({sourcename,sender,reciever,message,type}) {
  const [open, setOpen] = React.useState(true);

  if(type=='f'){
  const handleClick = () => {
    setOpen(true);
  };

  const handleYes = async() =>{
    let api = await fetch(`http://127.0.0.1:5000/add_folder/${metaData['firstname']}/${sourcename} shared by ${sender}`)
    api = await api.json();
    let api2 = await fetch(`http://127.0.0.1:5000/delete_folder_in_request/${sourcename}/${sender}/${reciever}`)
    api2 = await api2.json()
    console.log(api2['data'])
    setOpen(false);
    window.location.reload();
  }
  
  const handleNo = async() =>{
    let api = await fetch(`http://127.0.0.1:5000/delete_folder_in_request/${sourcename}/${sender}/${reciever}`)
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
      let api = await fetch(`http://127.0.0.1:5000/add_workspace/${metaData['firstname']}/${sourcename} shared by ${sender}`)
      api = await api.json();
      let api2 = await fetch(`http://127.0.0.1:5000/delete_workspace_in_request/${sourcename}/${sender}/${reciever}`)
      api2 = await api2.json()
      console.log(api2['data'])
      setOpen(false);
      window.location.reload();
    }
    
    const handleNo = async() =>{
      let api = await fetch(`http://127.0.0.1:5000/delete_workspace_in_request/${sourcename}/${sender}/${reciever}`)
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
