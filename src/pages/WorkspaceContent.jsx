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
const DOMAIN = 'http://127.0.0.1:5000/'
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

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  useEffect(async()=>{
    let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    console.log(metaData)
  },[update])
 


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


  return (
    <div >
              <Carousel name={metaData['firstname']} workspace={workspacename} /><br></br>

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
    <button onClick={()=>{alert(content)}} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>add notes</button>

          </div>
        <br></br>
        <hr></hr>

        <br></br>
        <CustomizedInputsStyleOverrides ph={"Explore topic"} setName={setExploreTopic} name={exploreTopic} />
        <br></br>
        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Explore topic</button>

        <br></br><br></br>
        <div style={{'width':'55%'}}>
        <React.Fragment>
      
      <BubbleUI className="bubbleUI" options={options}>
        {stockBubbles}
      </BubbleUI>
    
    </React.Fragment>


        </div>
    </div>
  );


}
export default WorkspaceContent;
