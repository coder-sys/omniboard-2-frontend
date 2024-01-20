import React from "react";
import Button from "../stories/Button"; 
import Share from "../stories/share";
import { metaData } from "../data/dummy";
const DOMAIN = 'http://127.0.0.1:5000'
const SD = 'http://localhost:3000'
export default function FolderBubble(props) {
  // console.log(props);
  const [open, setOpen] = React.useState(false);  //make it a public state

  return (
    <div onClick={()=>setOpen(true)} id="main"
      style={{
        backgroundColor: props.backgroundColor + "d0",
      }}
      className={"companyBubble"}
    >
      {true ? (
        <div 
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.1s ease",
            opacity: props.bubbleSize > 50 ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          
          <p 
            style={{
              color: props.textColor,
              fontSize: 15,
              fontFamily: 'Source Code Pro',
              marginLeft: 10,
              textAlign: "right",
            }}
          >
       <b><i>{props.symbol}</i></b>
          </p>
<br></br><br></br>
          
        </div>
      ) : null}
      <div >  {[1].map((data)=>{
        if(props.allowshare=="yes"){
        return<div style={{'marginBottom':'10px'}}> <Share name={metaData['firstname']} foldername={props.symbol} setUpdate={props.setUpdate} open={open} setOpen={setOpen} /></div>
        }
        else{
          return ""
        }
      })}   
      <div><br></br><br></br>
   <p
            style={{
              color: props.textColor,
              fontSize: 5,
              marginBottom: 6,
              fontWeight: 100,
              maxWidth: 100,
              textAlign: "center",
            }}
          >
  <Button style={{marginRight:"20px",color:props.textColor}} onClick={async()=>{
    let api = await fetch(`${DOMAIN}/delete_folder/${metaData['firstname']}/${props.symbol}`)
    api = await api.json()
    props.setUpdate(props.update+1)
  }} backgroundColor={"#D0BCFF"} size="small" label={"Delete Folder"} />

    <Button onClick={()=>{window.location.replace(`${SD}/folders/foldercontent/${props.symbol}/${metaData['email']}`)}} style={{marginRight:"20px",color:props.textColor}}  backgroundColor={"#D0BCFF"} size="small" label={"View Folder"}   />

          </p>
             <p
            style={{
              color: props.textColor,
              fontSize: 14,
              marginBottom: 6,
              fontWeight: 100,
              maxWidth: 100,
              textAlign: "center",
            }}
          >
                    
          </p>
</div>     
</div>

    </div>
  );
}


//<img
//src={`https://i.ytimg.com/vi/RNwJbMovnVQ/hq720.jpg`}
//alt=""
//style={{
 //width: 50,
  //borderRadius: `50%`,
  //marginBottom: 10,
  //marginLeft:"50px"

//}}
//></img>