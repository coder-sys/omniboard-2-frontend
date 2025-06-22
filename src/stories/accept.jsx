import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Row from './snackbar';
import { useState, useEffect } from 'react';
import { metaData } from '../data/dummy';
import useToken from '../components/useToken';

const style = {
  width: '1000px',
  maxWidth: "360px",
  bgcolor: 'background.paper',
};
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
export default function ListDividers({email,type, setUpdate}) {
  const [foldersInHolding, setFoldersInHolding] = useState([])
  const [workspacesInHolding, setWorkspaceInHolding] = useState([])
  const { token, removeToken, setToken } = useToken();

  useEffect(async()=>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', metaData['email'])
    const load_data = async()=>{
    let api = await fetch(`${DOMAIN}/load_waiting_folders/${metaData['email']}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api = await api.json()
    setFoldersInHolding(api['data'])
    console.log(api.data)
    console.log(email)
    let api1 = await fetch(`${DOMAIN}/load_waiting_workspaces/${metaData['email']}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api1 = await api1.json()
    setWorkspaceInHolding(api1['data'])
    console.log(api1['data'])
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
          <Row type={'f'} message={`${data['sender']} has shared ${data['foldername']} with you`} sender={data['sender']} reciever={metaData['firstname']} sourcename={data['foldername']} />
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
      if(workspacesInHolding != 'null'){

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
       {
            workspacesInHolding.map((data,i)=>{
              console.log('i want',data)
              return(
              <ListItem button>
          <Row type={'w'} row={data} message={`${data['sender']} has shared ${data['workspacename']} with you`} sender={data['sender']} reciever={metaData['firstname']} sourcename={data['workspacename']} />
          </ListItem>
              )
            })
          
        
        
      }
      
    </List>
  );
    }
    else{
      return "null"
    }
}
}
