import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { metaData } from '../data/dummy';
import  Button  from './Button';
import useToken from '../components/useToken';


const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
function ResourceCard({fname,name,thumbnail,description, foldername, sourcename, link, ...props}) {
  const [openShare, setOpenShare] = useState(false)
  const [update, setUpdate] = useState(0)
  const { token, removeToken, setToken } = useToken();

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
          let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
          preapi = await preapi.json()
          setToken(preapi.data)
         let api = await fetch(`${DOMAIN}/delete_saved_data/${fname}/${foldername}/${sourcename}`,{
          headers:{
            Authorization:`Bearer ${preapi.data}`
          }
        })
         api = await api.json()
         window.location.reload()
        }}  />
        <Button backgroundColor={"#D0BCFF"} size="small" label={"View"} onClick={()=>{window.open(link,'_blank')}} />

      </CardActions>
      
      
    
    </Card>
  );
}


export default ResourceCard;
