import React, { useState, useRef, useLayoutEffect, useEffect} from "react";
import { useParams } from 'react-router-dom';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import companyData from "./companies";
import FolderBubble from "./FolderBubble";
export default function Dashboard(props) {
  
    const {state,name} = useParams()


    const [stockBubbles,setStockBubbles] = useState([])
    const [update, setUpdate] = useState(0)

    useEffect(async()=>{
        const getFolderBubble = () => {
            return companyData.slice(0, 20).map((company, i) => {
              return <FolderBubble {...company} key={i} />;
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