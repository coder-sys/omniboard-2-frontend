import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Row from './snackbar';
import { useState, useEffect } from 'react';
import { metaData } from '../data/dummy';
const style = {
  width: '1000px',
  maxWidth: "360px",
  bgcolor: 'background.paper',
};

export default function ListDividers({email,type, setUpdate}) {
  const [foldersInHolding, setFoldersInHolding] = useState([])
  useEffect(async()=>{
    const load_data = async()=>{
    let api = await fetch(`http://127.0.0.1:5000/load_waiting_folders/${email}`)
    api = await api.json()
    setFoldersInHolding(api['data'])
    console.log(api.data)
    }
    load_data()
  })
  if(type=="folders"){
    /** load from student request folders */
    if(foldersInHolding != 'null'){
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {
            foldersInHolding.map((data,i)=>{
              return(
              <ListItem button>
          <Row message={`${data['sender']} has shared ${data['foldername']} with you`} sender={data['sender']} reciever={metaData['firstname']} sourcename={data['foldername']} />
          </ListItem>
              )
            })
          
        
        
      }
      
    </List>
  );
    }
    else{
      return ""
    }
}
else if (type=="workspaces"){
      /** load from student request workspaces */
      if(foldersInHolding != 'null'){

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
       {
            foldersInHolding.map((data,i)=>{
              return(
              <ListItem button>
          <Row message={`${data['sender']} has shared ${data['foldername']} with you`} />
          </ListItem>
              )
            })
          
        
        
      }
      
    </List>
  );
    }
}
}