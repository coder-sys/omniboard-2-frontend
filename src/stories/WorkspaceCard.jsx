import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { metaData } from '../data/dummy';
import  Button  from './Button';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Share from './share';
import useToken from '../components/useToken';
import { useEffect } from 'react';

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
const SD = 'https://Omniboard.afd.enterprises'
function WorkspaceCard({name,thumbnail,description, ...props}) {
  const [openShare, setOpenShare] = useState(false)
  const [update, setUpdate] = useState(0)
  const { token, removeToken, setToken } = useToken();
  useEffect(async()=>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', metaData['email'])
    console.log(token)
  },[])
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardMedia
        style={{ height: 140 }}
        image={thumbnail}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button backgroundColor={"#D0BCFF"} size="small" label={"Delete"} onClick={async()=>{
          let api = await fetch(`${DOMAIN}/delete_workspace/${metaData['firstname']}/${name}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          api = await api.json();
          window.location.reload();
        }}  />
        <Button backgroundColor={"#D0BCFF"} size="small" label={"View"} onClick={()=>{window.location.replace(`${SD}/workspace/workspacecontent/${name}/${metaData["email"]}`)}} />
        <Button backgroundColor={"#D0BCFF"} size="small" label={"Share"} onClick={()=>{setOpenShare(true)}} />

      </CardActions>
      
      {
        [1].map((data,index)=>{
          if(openShare == true){
            return(
            <ShareWorkspace name={metaData['firstname']} workspace={name} open={openShare} setOpen={setOpenShare} setUpdate={setUpdate} />
            )
          }
        }
        )}
    </Card>
  );
}
function ShareWorkspace({name,workspace, open, setOpen, setUpdate}) {
  const [recieverEmail, setRecieverEmail] = useState("j")
  const { token, removeToken, setToken } = useToken();

  const handleClick = async() => {
    console.log(`sharing folder ${workspace} to ${recieverEmail} from ${name} `)
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    let api = await fetch(`${DOMAIN}/share_workspace/${workspace}/${metaData['email']}/${recieverEmail}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api = await api.json()
    console.log(api)
    setUpdate(p=>p+1);
    setOpen(false);
    alert("Workspace has been sent")
  };

  const handleClose = async(event, reason) => {
    
    setOpen(true);
  };

  const action = (
    <React.Fragment>

<Button color="secondary" size="small" onClick={()=>{handleClick()}}>
        <>Send to </>
      </Button>
       
      <input style={{"backgroundColor":"black"}} placeholder={`Enter the recievers email`} onChange={(e)=>setRecieverEmail(e.target.value)} onKeyPress={(e)=>{if(e.key === 'Enter'){handleClick()}}} />

      <button style={{width:'50px'}} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl' onClick={()=>{handleClick()}}><p style={{'fontSize':'10px','marginRight':'15px'}} >Send</p></button>

    </React.Fragment>
  );

  return (
    <div>
      <Snackbar style={{'width':"290px"}}
        open={open}
        autoHideDuration={3000000}
        onClose={handleClose}
        message=""
        action={action}
      />
    </div>
  );
}

export default WorkspaceCard;
