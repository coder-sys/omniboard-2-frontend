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
const Workspaces = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  console.log(email)
  metaData['email'] = email
  const [update, setUpdate] = useState('')
  const [workspacename, setWorkspaceName] = useState("")
 
/** use useEffect for loding data below */
useEffect(async()=>{
  let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
  api = await api.json()
  metaData['firstname'] =  (api['firstname'])
  metaData['lastname'] = (api['lastname'])
 console.log(metaData['firstname'] )
},[update])
  return(
    <div className="mt-24">
     
<div  className="flow-chart-container">
<CustomizedInputsStyleOverrides ph={"Create Workspace"} keyDown={async()=>{
  let api = await fetch(`http://127.0.0.1:5000/add_workspace/${metaData['firstname']}/${workspacename}`);
  api = await api.json();
  window.location.reload();
}} name={workspacename} setName={setWorkspaceName} style={{'marginLeft':"500px"}} />
<div style={{marginLeft:"5%"}}><Button onClick={async()=>{
  let api = await fetch(`http://127.0.0.1:5000/add_workspace/${metaData['firstname']}/${workspacename}`);
  api = await api.json();
  window.location.reload();

}}  backgroundColor={"#D0BCFF"} size="small" label={"Create Workspace"} /></div>
<br></br>

<br></br>
    <Chart email={email} name={metaData['firstname']} workspacename={workspacename} setWorkspaceName={setWorkspaceName}  />

</div>
    </div>
  )
 

};
const Chart = ({ email, name, workspacename, setWorkspaceName, chartSimple }) => {
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
        let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
  api = await api.json()
        const nameParam = encodeURIComponent(api['firstname']);
        const workspaceResponse = await fetch(`http://127.0.0.1:5000/get_workspaces/${nameParam}`);
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
     //   let api3 = await fetch(`http://127.0.0.1:5000/generate_description/${nodes[key]['type']}`)
     //   api3 = await api3.json()
        count++;
        nodes[key].type = <div>Workspace<WorkspaceCard name={nodes[key]['type'].toUpperCase()} thumbnail={'/'} description={'api3[data]'} /></div>
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
    <>
      <FlowChartWithState key={update} initialValue={chart} />
    </>
  );
};


export default Workspaces;