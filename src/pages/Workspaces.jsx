import React,{useState,useEffect} from 'react';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData, metaData, stackedCustomSeries, workspaceNodeMap } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useParams } from 'react-router-dom';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import Card from "../stories/Card"
import Button from '../stories/Button';
import WorkspaceCard from '../stories/WorkspaceCard';
import "./index.css"
import CustomizedInputsStyleOverrides from "../stories/TextField";
import ListDividers from '../stories/accept';
import Row from '../stories/snackbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Cookies from 'js-cookie';
import useToken from '../components/useToken';

const style = {
  width: '1000px',
  maxWidth: "360px",
  bgcolor: 'background.paper',
};
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'

const Workspaces = () => {
  const { token, removeToken, setToken } = useToken();

  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  metaData['email'] = email
  const [update, setUpdate] = useState('')
  const [workspacename, setWorkspaceName] = useState("")
  const [date_err, setDR] = useState(100)
/** use useEffect for loding data below */

useEffect(async()=>{
  const cookieValue = Cookies.get('session_id')
  console.log('im looking for',cookieValue)
  


  let api = await fetch(`${DOMAIN}/email_to_name_map/${metaData['email']}`)
  api = await api.json()
  metaData['firstname'] =  (api['firstname'])
  metaData['lastname'] = (api['lastname'])
 console.log(metaData['firstname'] )
 let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    console.log(token)
 let api2 = await fetch(`${DOMAIN}/date_subtraction_for_paid_version`,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
 api2 = await api2.json()
 setDR(api2['data'])
},[update])
if(date_err<30){
  return(
    <div className="mt-24">
     
<div  className="flow-chart-container">


 <iframe
      src="https://master.d2i5ydaw0h5cgi.amplifyapp.com/"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '120vh',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 9999, // optional: ensures it's on top
      }}
      allowFullScreen
    />

</div>
    </div>
  )
}
else{
  return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
}
 

};
const Chart = ({ email, name, workspacename, setWorkspaceName, chartSimple }) => {
  const { token, removeToken, setToken } = useToken();

  const [comparedState, setComparedState] = useState(5);
  const [update, setUpdate] = useState(0);
  const [chart, setChart] = useState({
    "hovered": {},
    "links": {},
    "nodes": {},
    "offset": { "x": 0, "y": 0 },
    "selected": {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = await fetch(`${DOMAIN}/email_to_name_map/${email}`)
  api = await api.json()
        const nameParam = encodeURIComponent(api['firstname']);
        const workspaceResponse = await fetch(`${DOMAIN}/get_workspaces/${nameParam}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        if (!workspaceResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const workspaceData = await workspaceResponse.json();

        if (workspaceData && workspaceData.data) {
          const nodes = workspaceData.data.nodes;
          console.log(nodes[`node${1}`])
          let count = 0; //declaring count as 0
          let arr = []
      for (let key in nodes) {
       // let api3 = await fetch(`https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod/generate_description/${nodes[key]['type']}`)
       // api3 = await api3.json()
        count++;
        nodes[key].type = <div>Workspace<WorkspaceCard name={nodes[key]['type']} thumbnail={'/'} description={"api3[data]"} /></div>
        arr.push(count+1)
         
      }

          setChart(workspaceData.data);
       
          setUpdate(prev => prev + 1);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (update < comparedState+3) {
      fetchData();
      setUpdate(prev => prev + 1); 
      setComparedState(p=>p+1)
    } 
    fetchData();

    setComparedState(p=>p+1)

  }, []);
  return (
    <div>
          <ListDividersWorkspace  email={email} type={"workspaces"} />

      <FlowChartWithState key={update} initialValue={chart} />
    </div>
  );
};
function ListDividersWorkspace({email,type, setUpdate}) {
  const [foldersInHolding, setFoldersInHolding] = useState([])
  const [workspacesInHolding, setWorkspaceInHolding] = useState([])
  const { token, removeToken, setToken } = useToken();

  useEffect(async()=>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    const load_data = async()=>{
    let api = await fetch(`${DOMAIN}/load_waiting_folders/${email}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    api = await api.json()
    setFoldersInHolding(api['data'])
    console.log(api.data)
    console.log(email)
    let api1 = await fetch(`${DOMAIN}/load_waiting_workspaces/${email}`,{
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
 
      /** load from student request workspaces */
      if(workspacesInHolding != 'null'){
        console.log("ok")
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
      return ""
    }

}

export default Workspaces;

//<Row type={'w'} row={data} message={`${data['sender']} has shared ${data['workspacename']} with you`} sender={data['sender']} reciever={metaData['firstname']} sourcename={data['workspacename']} />