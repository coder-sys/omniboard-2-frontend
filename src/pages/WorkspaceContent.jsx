import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData} from '../data/dummy';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { useStateContext } from '../contexts/ContextProvider';
import Carousel from '../Carousel/Carousel';
import CustomizedInputsStyleOverrides from "../stories/TextField";

import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import companyData from "../BubbleUI/companies";
import FolderBubble from "../BubbleUI/FolderBubble"
import Button from "../stories/Button";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
const DOMAIN = 'http://127.0.0.1:5000'
import parse from 'html-react-parser';
import PacmanLoader  from "react-spinners/PacmanLoader";
import Cookies from 'js-cookie';

const WorkspaceContent = () => {
  const { currentColor, currentMode } = useStateContext();
  const {workspacename,email} = useParams()
  console.log(workspacename)
  console.log(metaData['workspaces'])
  metaData['email'] = email
  const [currentNotes,setCurrentNotes] = useState("")
  const [notes, setNotes] = useState("")
  const [exploreTopic, setExploreTopic] = useState("")
  const [stockBubbles,setStockBubbles] = useState([])
  const [update, setUpdate] = useState(0)
  const [content, setContent] = useState('');
  const [note, setNotes1] = useState("<u>test</u>")
  const [loaded_notes, setLoadedNotes] = useState([])
  const [date_error, setDR] = useState(100)

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  useEffect(async()=>{
    const cookieValue = Cookies.get('session_id')
   console.log('im looking for',cookieValue)
   let preapi = await fetch(`${DOMAIN}/session_map/${cookieValue}`)
   preapi = await preapi.json()
    let api = await fetch(`${DOMAIN}/email_to_name_map/${preapi['data']}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    console.log(metaData)
    let api2 = await fetch(`${DOMAIN}/retrieve_notes/${metaData['firstname']}/${workspacename}`)
    api2 = await api2.json()
    setLoadedNotes(api2['data'])
    console.log(api2['data'])
    let api3 = await fetch(`${DOMAIN}/date_subtraction_for_paid_version`)
    api3 = await api3.json()
    setDR(api3['data'])
  },[update])
 

const [loading, setLoading] = useState(false)
const [options, setOptions] = useState({
  size: 180,
  minSize: 20,
  gutter: 8,
  provideProps: true,
  numCols: 6,
  fringeWidth: 160,
  yRadius: 130,
  xRadius: 220,
  cornerRadius: 50,
  showGuides: false,
  compact: true,
  gravitation: 5,
});

if(date_error<30){
  return (
    <div >
              <Carousel name={metaData['firstname']} workspace={workspacename} data={loaded_notes} /><br></br>

     <div className="flex m-3 flex-wrap justify-center gap-1 items-center" style={{width:"50%"}}>
     <div>
      <div style={{'backgroundColor':'white'}} className="toolbar">
       
      
      <ReactQuill
        theme="snow" // You can choose different themes
        value={content}
        onChange={handleContentChange}
      />
      </div>
    </div>
    <button onClick={async()=>{
      let preapi = await fetch(`${DOMAIN}/email_to_name_map/${metaData['email']}`)
      preapi = await preapi.json()
      let api = await fetch(`${DOMAIN}/save_notes/${preapi['firstname']}/${workspacename}/${content.replace(new RegExp('/','gi'),'`')}`)
      api = await api.json()
      setContent('')
      window.location.reload()

    }} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>add notes</button>

          </div>
        <br></br>
        <hr></hr>

        <br></br>
        <CustomizedInputsStyleOverrides ph={"Explore a topic"} setName={setExploreTopic} name={exploreTopic} keyDown={async()=>{
          setLoading(true)
          let api2 = await fetch(`${DOMAIN}/load_related_topics/${exploreTopic}`)
          api2 = await api2.json()
          let api2n = api2['names']
          api2 = api2['data']
          setLoading(false)
          const getFolderBubble = () => {
            
            return api2.map((data, i) => {
              return <button  onClick={()=>window.open(data,'_blank')} >{api2n[i]}</button>
            });
          };
          setStockBubbles(getFolderBubble())
        }} />
        <br></br>
        <button onClick={async()=>{
          setLoading(true)
          let api2 = await fetch(`${DOMAIN}/load_related_topics/${exploreTopic}`)
          api2 = await api2.json()
          let api2n = api2['names']
          api2 = api2['data']
          setLoading(false)
          const getFolderBubble = () => {
            
            return api2.map((data, i) => {
              return <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl' onClick={()=>window.open(data,'_blank')} >{api2n[i]}</button>
            });
          };
          setStockBubbles(getFolderBubble())
        }} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Explore topic</button>

        <br></br><br></br>
        <div style={{'width':'55%'}}>
        <React.Fragment>
     <h1>{[1].map((data,i)=>{

      if(loading==true){
        return <div style={{'border':"1px solid black"}}><PacmanLoader color="purple" /></div>

      }
     })}</h1>
      <BubbleUI className="bubbleUI" options={options}>
        {stockBubbles}
      </BubbleUI>
    
    </React.Fragment>


        </div>
    </div>
  );
    }
    else{
      return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
    }

}
export default WorkspaceContent;
