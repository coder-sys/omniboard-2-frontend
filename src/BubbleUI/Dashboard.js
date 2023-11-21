import React, { useState, useRef, useLayoutEffect, useEffect} from "react";
import { useParams } from 'react-router-dom';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import companyData from "./companies";
import FolderBubble from "./FolderBubble";
import { metaData } from "../data/dummy";
export default function Dashboard(props) {
  
    const {state,email} = useParams()


    const [stockBubbles,setStockBubbles] = useState([])
    const [update, setUpdate] = useState(0)
    metaData['email'] = email
    useEffect(async()=>{
      let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
      api = await api.json()
      metaData['firstname'] =  (api['firstname'])
      metaData['lastname'] = (api['lastname'])
      console.log(metaData)
      let api2 = await fetch(`http://127.0.0.1:5000/get_folders/${metaData['firstname']}`)
      api2 = await api2.json()
      api2 = api2['data']
      console.log(api2)
      const getFolderBubble = () => {
        return api2.map((data, i) => {
          return <FolderBubble update={update} setUpdate={setUpdate} allowshare={'yes'} {...data} key={i} />;
        });
      };
      setStockBubbles(getFolderBubble())
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

  


  const demoRef = useRef(null);
  const docsRef = useRef(null);
  const codeRef = useRef(null);
  const layoutRef = useRef(null);
  const styleRef = useRef(null);
  console.log(stockBubbles)
  return (
    <React.Fragment>
      
      <BubbleUI className="bubbleUI" options={options}>
        {stockBubbles}
      </BubbleUI>
    
    </React.Fragment>
  );
}