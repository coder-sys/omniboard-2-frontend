import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import CustomizedInputsStyleOverrides from "../stories/TextField"
import WorkspaceCard from '../stories/WorkspaceCard';
import BasicTabs from '../stories/Tabs';
import ChatBody from "../ChatUI/chatBody/ChatBody"
import Button from "../stories/Button"
import translateLink from '../functions/translatelink';
import save_google_data from '../functions/save_google_data';
import save_youtube_data from '../functions/save_youtube_data';
const FolderContent = () => {
  const { currentColor, currentMode } = useStateContext();
  const {foldername,email} = useParams()
  metaData['email'] = email
  const [update, setUpdate] = useState('')
  const [query, setQuery] = useState("")
  const [googlesearch,setGoogleSearch] = useState('')
    const [retrievegoogledata1,setRetrieveGoogleData1] = useState([])
    const [retrievegoogledata2,setRetrieveGoogleData2] = useState([])
    const [description,setDescription] = useState([])
    const [youtubesearch,setYoutubeSearch] = useState('')
    const [linkjoin,setLinkJoin] = useState([])
    const [djoin,setDJoin] = useState([])
    const [youtubeAPITitles,setyoutubeAPITitles] = useState([])
    const [youtubeAPILinks,setyoutubeAPILinks] = useState([])
    const [updated,setUpdated] = useState(0)
    const [stored_data_array,setStored_dataArray] = useState([])
    const [linkarray,setLinkarray] = useState([])
    const [update_effect,setue]= useState(0)
    const [thumbnail,setThumbnail] = useState([])
    const [stored_data,setStoredData] = useState([])
    const [stored_data_yt,setStoredDataYT] = useState([])
    const [consent,setConsent] = useState(true)
    const [consent1,setConsent1] = useState(true)
    const [SDoM,setSDom] = useState('Scroll down to start your internet research')
    const [conceptsearch,setConceptSearch] = useState('')
    const [csResultData,setCsResultData] = useState([])
    const [sdomo,Ssdomo] = useState(0)

  useEffect(async()=>{
    let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    console.log(metaData)
  },[update])
  
  const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

  const searchIntegration = async()=>{
    setYoutubeSearch(query)
    setGoogleSearch(query)
    setConceptSearch(query)
    setUpdated(updated+1)
                       setue(update_effect+1)
       
                       let api = await fetch(`http://127.0.0.1:5000/get_youtube_data/${query}`)
                       api = await api.json()
                       setyoutubeAPITitles(api.titles)
                       setyoutubeAPILinks(api.link)
                       setThumbnail(api.thumbnail)
                       console.log(api.titles)
                       translateLink(api.link).then((data)=>{
                       translateLink(linkarray).then(async(data1)=>{
                               try{
                               console.log(data,data1)
                               console.log(`http://127.0.0.1:5000/find_similarity_links/${data.join()}/${data1.join()}`)
                               let api = await fetch(`http://127.0.0.1:5000/find_similarity_links/${data.join()}/${data1.join()}`)
                               api = await api.json()
                               setStoredDataYT(api.data)}catch(err){console.log(err)}
                               })
                              })
  
                              try{
                                setUpdated(updated+1)
                          setue(update_effect+1)
                          let api = await fetch(`http://127.0.0.1:5000/get_google_content/${query}`)
                          api = await api.json()
                          console.log(api.names)
                          setRetrieveGoogleData1(api.names)
                          setRetrieveGoogleData2(api.urls)
                          setDescription(api.description)
                          let emailandlastname = await fetch(`http://127.0.0.1:5000/get_last_name_and_email/${metaData['firstname']}`)
                          emailandlastname = await emailandlastname.json()
                          let lapi = await fetch('http://127.0.0.1:5000/get_stored_links/'+metaData['firstname']+emailandlastname['lastname']+emailandlastname['email']+'/'+foldername)
                          lapi = await lapi.json()
                          translateLink(api.urls).then((data)=>{
                            translateLink(lapi.data).then(async(data1)=>{
                              try{
                                let dt = []
                                let dt1 = []
                                data.join('').split('').map((data,index)=>{
                                  if(data == '/'){
                                    data = '`'
                                  }
                                  dt.push(data)
                                })
                              dt.join('').split('http').map((data,index)=>{
                                if(index>0){
                                dt1.push('http'+data)
                                }
                              })
                              console.log(dt1.join())
                              console.log(`http://127.0.0.1:5000/find_similarity_links/${dt1.join()}/${data1.join()}`)
                              let api = await fetch(`http://127.0.0.1:5000/find_similarity_links/${dt1.join()}/${data1.join()}`)
                              api = await api.json()
                            setStoredData(api.data)}catch(err){console.log(err)}
                          })
                          })}catch(err){alert('Error: Too many requests. Google has temporarily blocked you. Try again later.')}
                                                        
  
                          setConsent(false)
  
                                    try{
                                        setUpdated(updated+1)
                                  setue(update_effect+1)
                                        let emailandlastname = await fetch(`http://127.0.0.1:5000/get_last_name_and_email/${metaData['firstname']}`)
                                        emailandlastname = await emailandlastname.json()
                                        let api = await fetch(`http://127.0.0.1:5000/get_results_on_conceptual_search/${query}/${metaData['firstname']+emailandlastname['lastname']+emailandlastname['email']}/${foldername}`)
                                        api = await api.json()
                                        setCsResultData(api['data'])
                    api['data'].map((data)=>{
                      setConsent(true)
  
                    })
                                    }catch(err){
                                        console.log(err)
                    alert('The educational search you made was too specific,use the google search feature for your search')
                    return(
                      <a href='/#googlesearch'><FormButton>Go to Google Search</FormButton></a>
                    )
                                    }
  
  }

  const chartSimple = {
    offset: {
      x: 0,
      y: 0
    },
 
    nodes: {
      node1: {
        id: "node1",
        type: <div> <b><i>Workspace</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /> </div>,
        position: {
          x: 0,
          y:0
        },
       
        ports: {
          port1: {
            id: "port1",
            type: "output",
            properties: {
              value: "yes"
            }
          },
          port2: {
            id: "port2",
            type: "output",
            properties: {
              value: "no"
            }
          }
        }
      },
      node2: {
        id: "node2",
        type:<div><b><i>Workspace1</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 100)-400,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 100)
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node3: {
        id: "node3",
        type: <div><b><i>Workspace2</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 200)-400,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 200)
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node4: {
        id: "node4",
        type: <div><b><i>Workspace3</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 300)-400,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 300)
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node5: {
        id: "node5",
        type: <div><b><i>Workspace4</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 400)-300,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 400)
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      }
    },
    links: {
      link1: {
        id: "link1",
        from: {
          nodeId: "node1",
          portId: "port1"
        },
        to: {
          nodeId: "node1",
          portId: "port2"
        },
      },
      link2: {
        id: "link2",
        from: {
          nodeId: "node2",
          portId: "port1"
        },
        to: {
          nodeId: "node2",
          portId: "port2"
        },
      },
      link3: {
        id: "link3",
        from: {
          nodeId: "node3",
          portId: "port1"
        },
        to: {
          nodeId: "node3",
          portId: "port2"
        },
        link4: {
          id: "link4",
          from: {
            nodeId: "node4",
            portId: "port1"
          },
          to: {
            nodeId: "node4",
            portId: "port2"
          },
        }
      },
    },
    selected: {},
    hovered: {}
  };
  return (
    <div className="mt-24">
           <ChatBody  />

     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

<br></br>
<div>
<CustomizedInputsStyleOverrides ph={"Start search"} name={query} setName={setQuery} keyDown={()=>searchIntegration()}  /><br></br>
<div style={{marginLeft:'25px'}}>
<Button  backgroundColor={"#D0BCFF"} size="small" label={"Start search"} onClick={
              ()=>     searchIntegration()  
}  />
</div>
</div>

     <BasicTabs displayChart={chartSimple} quizMCQ={questions} search={query} name={metaData['firstname']} foldername={foldername} googlesearch={googlesearch} setConsent={setConsent} save_data_google={save_google_data} retrievegoogledata1={retrievegoogledata1} retrievegoogledata2={retrievegoogledata2} description={description} update_effect={setUpdate} setue={setue} stored_data={stored_data} djoin={djoin} linkjoin={linkjoin} />
          </div>

    </div>
  );
}
export default FolderContent;
 

